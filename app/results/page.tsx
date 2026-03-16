import type { Metadata } from 'next'
import ResultsClient from './ResultsClient'

type Props = { searchParams: { url?: string; score?: string } }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const rawUrl = searchParams.url || ''
  let domain = ''
  try { domain = new URL(decodeURIComponent(rawUrl)).hostname } catch {}

  const title = domain
    ? `KI-Analyse: ${domain} | AEO Gastro Scanner`
    : 'AEO Gastro Scanner für Gastronomie'
  const description = domain
    ? `AEO-Ergebnis für ${domain}: Wie sichtbar ist dein Restaurant für ChatGPT, Google AI und Perplexity?`
    : 'Kostenloser AEO-Scan für die Gastronomie'

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default function ResultsPage() {
  return <ResultsClient />
}
