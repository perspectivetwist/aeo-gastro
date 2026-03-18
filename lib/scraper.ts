import { ScrapedContent } from '@/types/aeo'
import { detectLanguage } from '@/lib/language'

const SCRAPE_TIMEOUT_MS = 20000
const AUTH_TIMEOUT_MS = 8000

async function fetchJina(targetUrl: string, useAuth: boolean): Promise<Response> {
  const jinaUrl = `https://r.jina.ai/${targetUrl}`
  const headers: Record<string, string> = { 'Accept': 'text/plain' }
  if (useAuth && process.env.JINA_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.JINA_API_KEY.trim()}`
  }
  const timeout = useAuth ? AUTH_TIMEOUT_MS : SCRAPE_TIMEOUT_MS
  return fetch(jinaUrl, { headers, signal: AbortSignal.timeout(timeout) })
}

async function fetchWithFallbacks(url: string): Promise<Response> {
  const hasKey = !!process.env.JINA_API_KEY
  const urls = [url]
  if (url.startsWith('https://')) {
    urls.push(url.replace('https://', 'http://'))
  }

  if (hasKey) {
    for (const targetUrl of urls) {
      try {
        const res = await fetchJina(targetUrl, true)
        if (res.ok) return res
        if (res.status === 401) break
        if (res.status === 422) continue
        return res
      } catch {
        break
      }
    }
  }

  for (const targetUrl of urls) {
    try {
      const res = await fetchJina(targetUrl, false)
      if (res.ok) return res
      if (res.status === 422) continue
      return res
    } catch (err) {
      if (targetUrl === urls[urls.length - 1]) throw err
      continue
    }
  }

  throw new Error('Jina.ai Fehler: Alle Versuche fehlgeschlagen')
}

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  const response = await fetchWithFallbacks(url)

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
