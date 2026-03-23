import { ScrapedContent, TransformerOutput, FaqItem } from '@/types/aeo'
import {
  detectIndustry,
  optimizeTitle,
  optimizeDescription,
  generateJsonLd,
  extractAnswerBlock,
  extractFaqItems,
} from './rule-transformer'

function cleanApiKey(key: string | undefined): string | undefined {
  if (!key) return undefined
  return key.replace(/^["']+|["']+$/g, '').replace(/\\n/g, '').trim()
}

// Claude-Call für answerBlock + faqItems (optional, non-fatal)
async function claudeGenerateContent(
  content: ScrapedContent
): Promise<{ answerBlock: string; faqItems: FaqItem[] } | null> {
  const apiKey = cleanApiKey(process.env.ANTHROPIC_API_KEY)
  if (!apiKey) return null

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    const langInstruction = content.language === 'de'
      ? 'Antworte auf Deutsch.'
      : 'Respond in English.'

    const prompt = `Du bist ein AEO-Experte. Erstelle für diese Website optimierten Content der von KI-Systemen zitiert werden kann.

URL: ${content.url}
Titel: ${content.title}
Inhalt (erste 3000 Zeichen):
${content.bodyText.slice(0, 3000)}

${langInstruction}

Erstelle exakt dieses JSON-Objekt (kein anderer Text, nur JSON):
{
  "answerBlock": "Direkte Antwort auf die Hauptfrage dieser Seite. Max 150 Wörter. Beginne mit dem Kernthema, nicht mit 'Diese Seite...' oder 'Hier finden Sie...'. KI-zitierbar.",
  "faqItems": [
    {"question": "Frage 1 die echte Nutzer stellen?", "answer": "Direkte Antwort in 2-3 Sätzen."},
    {"question": "Frage 2?", "answer": "Antwort."},
    {"question": "Frage 3?", "answer": "Antwort."},
    {"question": "Frage 4?", "answer": "Antwort."},
    {"question": "Frage 5?", "answer": "Antwort."}
  ]
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleanJson) as { answerBlock: string; faqItems: FaqItem[] }

    if (parsed.answerBlock && Array.isArray(parsed.faqItems)) {
      return parsed
    }
    return null
  } catch {
    // Non-fatal: Claude nicht verfügbar → Fallback wird genutzt
    return null
  }
}

export async function transformContent(content: ScrapedContent): Promise<TransformerOutput> {
  // Regelbasierte Felder (immer)
  const industry = detectIndustry(content)
  const metaTitle = optimizeTitle(content.title)
  const metaDescription = optimizeDescription(content.description)

  // Claude für answerBlock + faqItems (mit Fallback)
  const claudeResult = await claudeGenerateContent(content)

  const answerBlock = claudeResult?.answerBlock ?? extractAnswerBlock(content)
  const faqItems = claudeResult?.faqItems ?? extractFaqItems(content)

  // JSON-LD aus finalen faqItems generieren (immer regelbasiert)
  const jsonLd = generateJsonLd(faqItems)

  return {
    answerBlock,
    faqItems,
    jsonLd,
    metaTitle,
    metaDescription,
    industry,
  }
}
