import Anthropic from '@anthropic-ai/sdk'
import { ScrapedContent, TransformerOutput } from '@/types/aeo'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function transformContent(content: ScrapedContent): Promise<TransformerOutput> {
  const langInstruction = content.language === 'de'
    ? 'Antworte auf Deutsch.'
    : 'Respond in English.'

  const prompt = `Du bist ein AEO-Experte (Answer Engine Optimization). Analysiere diese Website und erstelle optimierten Content der von KI-Systemen wie ChatGPT, Perplexity und Gemini zitiert werden kann.

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
  ],
  "jsonLd": "{\\"@context\\": \\"https://schema.org\\", \\"@type\\": \\"FAQPage\\", \\"mainEntity\\": [{\\"@type\\": \\"Question\\", \\"name\\": \\"Frage 1?\\", \\"acceptedAnswer\\": {\\"@type\\": \\"Answer\\", \\"text\\": \\"Antwort 1\\"}}]}",
  "metaTitle": "Optimierter Title. Max 60 Zeichen.",
  "metaDescription": "Optimierte Meta-Description die den Kernnutzen erklärt. Max 155 Zeichen, inkl. Keyword.",
  "industry": "Gib die Branche auf Deutsch zurück, max. 2 Wörter, kein Schrägstrich, kein Englisch. Beispiele: Zahnarzt, Handwerker, Online-Shop, Steuerberater. Fallback: 'Websites allgemein'"
}`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

  // JSON parsen (Haiku gibt manchmal Markdown-Fences zurück)
  const cleanJson = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    const parsed = JSON.parse(cleanJson) as TransformerOutput
    return parsed
  } catch {
    throw new Error(`Claude Haiku JSON-Parse Fehler. Raw: ${responseText.slice(0, 200)}`)
  }
}
