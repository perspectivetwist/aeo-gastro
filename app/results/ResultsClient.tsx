'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { ScanResult } from '@/types/aeo'
import ScoreDisplay from '@/components/ScoreDisplay'
import ScoreCriteria from '@/components/ScoreCriteria'
import AnswerBlock from '@/components/AnswerBlock'
import FaqSection from '@/components/FaqSection'
import JsonLdOutput from '@/components/JsonLdOutput'
import MetaTagsOutput from '@/components/MetaTagsOutput'
import RankingCard from '@/components/RankingCard'
import EmailGate from '@/components/EmailGate'
import BlurWrapper from '@/components/BlurWrapper'
import CrossSell from '@/components/CrossSell'
import ShareButton from '@/components/ShareButton'
import KIZusammenfassung from '@/components/KIZusammenfassung'
import { trackScanComplete, trackEmailGate } from '@/lib/gtag'

const SECTION_CONFIG = [
  { criterionName: 'Direkte Antwort', label: 'Direkte Antwort', subtitle: 'Gibt deine Website eine klare Antwort auf die Hauptfrage?', effort: '30 Min', key: 'answerBlock' },
  { criterionName: 'FAQ-Struktur', label: 'Fragen & Antworten', subtitle: 'Beantwortet deine Website die häufigsten Kundenfragen?', effort: '1 Std', key: 'faq' },
  { criterionName: 'Title & Description', label: 'Auffindbarkeit', subtitle: 'Tauchst du in KI-Antworten auf?', effort: '15 Min', key: 'meta' },
  { criterionName: 'JSON-LD Schema', label: 'Datenstruktur', subtitle: 'Sind deine Inhalte für KI strukturiert aufbereitet?', effort: '1-2 Std', key: 'jsonld' },
  { criterionName: 'Autor sichtbar', label: 'Glaubwürdigkeit', subtitle: 'Erkennen ChatGPT & Co. dich als verlässliche Quelle?', effort: '30 Min', key: 'credibility' },
]

function getCardBadge(pct: number): { label: string; color: string } {
  if (pct <= 30) return { label: 'KRITISCH', color: '#ef4444' }
  if (pct <= 60) return { label: 'WICHTIG', color: '#f97316' }
  return { label: 'EMPFOHLEN', color: '#eab308' }
}

interface SectionData {
  criterionName: string
  label: string
  subtitle: string
  effort: string
  key: string
  score: number
  maxScore: number
  pct: number
  hint: string
}

function SectionCard({ section, isWorst, result }: { section: SectionData; isWorst: boolean; result: ScanResult }) {
  const badge = getCardBadge(section.pct)

  return (
    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
      {isWorst && (
        <p className="text-xs font-semibold mb-2" style={{ color: '#6366f1' }}>
          Dein größtes Risiko
        </p>
      )}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border"
            style={{ color: badge.color, backgroundColor: badge.color + '15', borderColor: badge.color + '40' }}
          >
            {badge.label}
          </span>
          <span className="text-sm font-medium text-white">{section.label}</span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{section.effort}</span>
      </div>
      {section.hint && (
        <p className="text-sm text-white font-medium">{section.hint}</p>
      )}
      <p className="text-xs text-gray-500 mt-1 mb-3">{section.subtitle}</p>
      <div className="border-t border-white/10 pt-3">
        {section.key === 'answerBlock' && (
          <AnswerBlock content={result.transformer.answerBlock} />
        )}
        {section.key === 'faq' && (
          <FaqSection faqItems={result.transformer.faqItems} />
        )}
        {section.key === 'meta' && (
          <MetaTagsOutput
            title={result.transformer.metaTitle}
            description={result.transformer.metaDescription}
          />
        )}
        {section.key === 'jsonld' && (
          <JsonLdOutput jsonLd={result.transformer.jsonLd} />
        )}
        {section.key === 'credibility' && (
          <p className="text-sm text-gray-400 font-light">
            {section.hint || 'Autor-Informationen und Vertrauenssignale prüfen.'}
          </p>
        )}
      </div>
    </div>
  )
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''

  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem('aeo_unlocked') === 'true'
    setIsUnlocked(unlocked)
  }, [])

  useEffect(() => {
    if (!url) {
      setError('Keine URL angegeben')
      setLoading(false)
      return
    }

    const cached = sessionStorage.getItem('aeo_result')
    if (cached) {
      try {
        const data: ScanResult = JSON.parse(cached)
        sessionStorage.removeItem('aeo_result')
        setResult(data)
        trackScanComplete(decodeURIComponent(url), data.score.total)
        if (!isUnlocked) trackEmailGate('shown')
        setLoading(false)
        return
      } catch {
        // Fall through to API call
      }
    }

    async function runScan() {
      try {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: decodeURIComponent(url) }),
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || `Fehler ${res.status}`)
        }

        const data: ScanResult = await res.json()
        setResult(data)
        trackScanComplete(decodeURIComponent(url), data.score.total)
        if (!isUnlocked) trackEmailGate('shown')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
      } finally {
        setLoading(false)
      }
    }

    runScan()
  }, [url])

  function handleUnlock() {
    localStorage.setItem('aeo_unlocked', 'true')
    setIsUnlocked(true)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4" />
          <p className="text-lg font-light text-gray-300">Analysiere Website...</p>
          <p className="text-sm font-light text-gray-500 mt-1">Das kann bis zu 30 Sekunden dauern</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">&#x26a0;&#xfe0f;</div>
          <h1 className="text-xl font-bold text-white mb-2">Analyse fehlgeschlagen</h1>
          <p className="text-gray-400 font-light mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 h-11 leading-[2.75rem] bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Zurück zur Startseite
          </a>
        </div>
      </main>
    )
  }

  if (!result) return null

  const sections = SECTION_CONFIG.map(config => {
    const criterion = result.score.criteria.find(c => c.name === config.criterionName)
    const score = criterion?.score ?? 0
    const maxScore = criterion?.maxScore ?? 1
    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
    const hint = criterion?.hint ?? ''
    return { ...config, score, maxScore, pct, hint }
  }).sort((a, b) => a.pct - b.pct)

  const visibleSections = sections.slice(0, 2)
  const gatedSections = sections.slice(2)

  return (
    <main className={`min-h-screen ${!isUnlocked ? 'pb-32' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <ScoreDisplay score={result.score.total} url={result.url} />

        <ShareButton score={result.score.total} resultUrl={typeof window !== 'undefined' ? window.location.href : ''} />

        <RankingCard
          score={result.score.total}
          industry={result.transformer.industry || 'Websites allgemein'}
        />

<ScoreCriteria criteria={result.score.criteria} />

        <KIZusammenfassung kiSummary={result.kiSummary ?? null} isUnlocked={isUnlocked} />

        {/* Visible cards (items 01+02) */}
        {visibleSections.map((section, i) => (
          <SectionCard
            key={section.key}
            section={section}
            isWorst={i === 0}
            result={result}
          />
        ))}

        {/* Gated cards (items 03+) — blurred when locked */}
        {gatedSections.length > 0 && !isUnlocked && (
          <BlurWrapper bgColor="#0a0a0f">
            <div className="space-y-6">
              {gatedSections.map((section) => (
                <SectionCard
                  key={section.key}
                  section={section}
                  isWorst={false}
                  result={result}
                />
              ))}
            </div>
          </BlurWrapper>
        )}

        {gatedSections.length > 0 && isUnlocked &&
          gatedSections.map((section) => (
            <SectionCard
              key={section.key}
              section={section}
              isWorst={false}
              result={result}
            />
          ))
        }

        <CrossSell />

        <div className="text-center pt-4">
          <a
            href="/"
            className="text-purple-400 hover:text-purple-300 font-light text-sm"
          >
            &larr; Weitere URL analysieren
          </a>
        </div>

        {/* ASD Hotmail Footer */}
        <div className="text-center pt-8 pb-4 border-t border-white/10 mt-8">
          <a
            href="https://ai-gastro-hub.vercel.app?utm_source=aeo&utm_medium=report&utm_campaign=hotmail"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Erstellt mit AI Shift Drift | Kostenloser KI-Scan f&uuml;r Restaurants
          </a>
        </div>
      </div>

      {!isUnlocked && (
        <EmailGate
          primaryColor="#6366f1"
          scannerSource="gastro-aeo"
          url={decodeURIComponent(url)}
          onUnlock={handleUnlock}
        />
      )}
    </main>
  )
}

export default function ResultsClient() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto" />
      </main>
    }>
      <ResultsContent />
    </Suspense>
  )
}
