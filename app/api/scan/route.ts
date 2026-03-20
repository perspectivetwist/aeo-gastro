import { NextRequest, NextResponse } from 'next/server'
import { scrapeUrl } from '@/lib/scraper'
import { calculateTotalScore } from '@/lib/scorer'
import { transformContent } from '@/lib/transformer'
import { checkRateLimit, isCrawlerAuthorized } from '@/lib/rate-limit'
import { ScanResult, ApiError } from '@/types/aeo'
import { generateKiSummary } from '@/lib/ki-summary'
import { logScan } from '@/lib/notion'
import { pingIndexNow } from '@/lib/indexnow'

// SSRF-Schutz: Interne IPs und Hostnamen blocken
const BLOCKED_HOSTS = [
  /^localhost$/i,
  /^127\.\d+\.\d+\.\d+$/,
  /^10\.\d+\.\d+\.\d+$/,
  /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/,
  /^192\.168\.\d+\.\d+$/,
  /^0\.0\.0\.0$/,
  /^169\.254\.\d+\.\d+$/,       // Link-local
  /^\[?::1\]?$/,                 // IPv6 loopback
  /^\[?fe80:/i,                  // IPv6 link-local
  /^\[?fc00:/i,                  // IPv6 unique local
  /^\[?fd/i,                     // IPv6 unique local
  /\.local$/i,                   // mDNS
  /\.internal$/i,
]

function isBlockedHost(hostname: string): boolean {
  return BLOCKED_HOSTS.some(pattern => pattern.test(hostname))
}

export async function POST(request: NextRequest) {
  try {
    // Crawler-Bypass oder Rate Limiting
    const crawlerSecret = request.headers.get('x-crawler-secret')
    const skipRateLimit = isCrawlerAuthorized(crawlerSecret)

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'

    let remaining = 999
    if (!skipRateLimit) {
      const rateCheck = checkRateLimit(ip)
      remaining = rateCheck.remaining
      if (!rateCheck.allowed) {
        return NextResponse.json<ApiError>(
          { error: 'Zu viele Anfragen. Bitte in einer Stunde erneut versuchen.' },
          { status: 429 }
        )
      }
    }

    const body = await request.json() as { url: string }
    const { url } = body

    // Input-Validierung
    if (!url || typeof url !== 'string') {
      return NextResponse.json<ApiError>(
        { error: 'URL fehlt oder ungültig' },
        { status: 400 }
      )
    }

    // Max URL-Länge
    if (url.length > 500) {
      return NextResponse.json<ApiError>(
        { error: 'URL zu lang (max 500 Zeichen)' },
        { status: 400 }
      )
    }

    // URL normalisieren
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    let parsedUrl: URL
    try {
      parsedUrl = new URL(normalizedUrl)
    } catch {
      return NextResponse.json<ApiError>(
        { error: 'Ungültige URL. Beispiel: https://example.com' },
        { status: 400 }
      )
    }

    // Nur http/https erlauben
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json<ApiError>(
        { error: 'Nur HTTP/HTTPS URLs erlaubt' },
        { status: 400 }
      )
    }

    // SSRF-Schutz: Interne Hosts blocken
    if (isBlockedHost(parsedUrl.hostname)) {
      return NextResponse.json<ApiError>(
        { error: 'Diese URL kann nicht analysiert werden' },
        { status: 400 }
      )
    }

    // Pipeline: Scrape → Score → Transform (parallel möglich für Score+Transform)
    const scraped = await scrapeUrl(normalizedUrl)
    const [score, transformer] = await Promise.all([
      Promise.resolve(calculateTotalScore(scraped)), // Synchron
      transformContent(scraped),                      // Async (Claude API)
    ])

    // KI-Zusammenfassung generieren (non-fatal)
    let kiSummary = undefined
    try {
      const befunde = score.criteria
        .filter(c => !c.passed)
        .map(c => `${c.name}: ${c.hint}`)
        .join(' | ')
      if (befunde) {
        kiSummary = await generateKiSummary(normalizedUrl, befunde) ?? undefined
      }
    } catch (err) {
      console.error('KI-Summary error (non-fatal):', err)
    }

    const result: ScanResult = {
      url: normalizedUrl,
      score,
      transformer,
      kiSummary,
      language: scraped.language,
      scannedAt: new Date().toISOString(),
    }

    // Scan in Notion loggen
    await logScan(normalizedUrl, score.total)

    // IndexNow: Result-URL an Bing pushen (fire-and-forget)
    pingIndexNow(normalizedUrl)

    const response = NextResponse.json(result)
    response.headers.set('X-RateLimit-Remaining', String(remaining))
    return response

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler'

    // Jina.ai Fehler
    if (message.includes('Jina.ai')) {
      return NextResponse.json<ApiError>(
        { error: 'Website konnte nicht geladen werden. Bitte URL prüfen.' },
        { status: 422 }
      )
    }

    // Claude API Fehler
    if (message.includes('Claude') || message.includes('JSON-Parse')) {
      return NextResponse.json<ApiError>(
        { error: 'KI-Analyse fehlgeschlagen. Bitte erneut versuchen.' },
        { status: 503 }
      )
    }

    return NextResponse.json<ApiError>(
      { error: 'Interner Fehler', details: message },
      { status: 500 }
    )
  }
}
