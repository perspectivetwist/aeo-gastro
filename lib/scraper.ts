import { ScrapedContent } from '@/types/aeo'
import { detectLanguage } from '@/lib/language'

const SCRAPE_TIMEOUT_MS = 20000

async function fetchViaJina(targetUrl: string): Promise<Response> {
  const jinaUrl = `https://r.jina.ai/${targetUrl}`
  const headers: Record<string, string> = { 'Accept': 'text/plain' }
  if (process.env.JINA_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.JINA_API_KEY}`
  }
  return fetch(jinaUrl, {
    headers,
    signal: AbortSignal.timeout(SCRAPE_TIMEOUT_MS),
  })
}

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  let response = await fetchViaJina(url)

  // HTTPS→HTTP Fallback: Wenn Jina 422 gibt (SSL-Fehler), mit http:// versuchen
  if (!response.ok && response.status === 422 && url.startsWith('https://')) {
    response = await fetchViaJina(url.replace('https://', 'http://'))
  }

  // Auth-Fallback: Wenn 401 (ungültiger Key), ohne Auth-Header versuchen
  if (!response.ok && response.status === 401 && process.env.JINA_API_KEY) {
    response = await fetch(`https://r.jina.ai/${url}`, {
      headers: { 'Accept': 'text/plain' },
      signal: AbortSignal.timeout(SCRAPE_TIMEOUT_MS),
    })
    if (!response.ok && response.status === 422 && url.startsWith('https://')) {
      response = await fetch(`https://r.jina.ai/${url.replace('https://', 'http://')}`, {
        headers: { 'Accept': 'text/plain' },
        signal: AbortSignal.timeout(SCRAPE_TIMEOUT_MS),
      })
    }
  }

  if (!response.ok) {
    throw new Error(`Jina.ai Fehler: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  // Titel extrahieren (erste H1 oder <title>)
  const titleMatch = text.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : url

  // Meta Description (erste Zeile nach Titel)
  const descMatch = text.match(/^(?!#)(.{50,200})/m)
  const description = descMatch ? descMatch[1] : ''

  // JSON-LD prüfen
  const hasJsonLd = text.includes('"@context"') || text.includes('@type')

  // FAQ prüfen
  const hasFaq = /\b(FAQ|Häufig|frequently asked|fragen)\b/i.test(text) ||
                 (text.match(/\?/g) || []).length >= 3

  // Autor prüfen
  const hasAuthor = /\b(autor|author|von|by|geschrieben)\b/i.test(text)

  // Datum prüfen
  const hasDate = /\b(202[0-9]|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|january|february|march)\b/i.test(text)

  // Externe Links prüfen
  const hasExternalLinks = (text.match(/https?:\/\//g) || []).length > 2

  // Sprache erkennen
  const language = detectLanguage(text)

  return {
    url,
    title,
    description,
    bodyText: text.slice(0, 10000), // Max 10k Zeichen für Claude
    hasJsonLd,
    jsonLdRaw: null, // Vereinfacht für V0
    hasFaq,
    hasAuthor,
    hasDate,
    hasExternalLinks,
    language,
  }
}
