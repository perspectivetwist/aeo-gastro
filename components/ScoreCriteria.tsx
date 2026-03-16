import { ScoreCriterion } from '@/types/aeo'

interface Props { criteria: ScoreCriterion[] }

const LABEL_MAP: Record<string, { label: string; subtitle: string }> = {
  'JSON-LD Schema': { label: 'Datenstruktur', subtitle: 'Sind deine Inhalte für KI strukturiert aufbereitet?' },
  'FAQ-Struktur': { label: 'Fragen & Antworten', subtitle: 'Beantwortet deine Website die häufigsten Kundenfragen?' },
  'Lesbarkeit': { label: 'KI-Lesbarkeit', subtitle: 'Können ChatGPT & Co. deine Inhalte lesen?' },
  'Autor sichtbar': { label: 'Glaubwürdigkeit', subtitle: 'Erkennen ChatGPT & Co. dich als verlässliche Quelle?' },
  'Title & Description': { label: 'Auffindbarkeit', subtitle: 'Tauchst du in KI-Antworten auf?' },
}

function getBarColor(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  if (pct <= 30) return '#ef4444'
  if (pct <= 60) return '#f97316'
  if (pct <= 85) return '#eab308'
  return '#22c55e'
}

function getScoreBadge(score: number, maxScore: number): { text: string; color: string } {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0
  if (pct <= 30) return { text: 'KRITISCH', color: '#ef4444' }
  if (pct <= 60) return { text: 'WICHTIG', color: '#f97316' }
  return { text: 'EMPFOHLEN', color: '#eab308' }
}

export default function ScoreCriteria({ criteria }: Props) {
  const sorted = [...criteria].sort((a, b) => a.score - b.score)

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-4">Kriterien-Analyse</h2>
      <div className="space-y-3">
        {sorted.map((c, i) => {
          const mapped = LABEL_MAP[c.name]
          const label = mapped?.label || c.name
          const subtitle = mapped?.subtitle
          const badge = getScoreBadge(c.score, c.maxScore)
          const isWorst = i === 0

          return (
            <div key={c.name}>
              {isWorst && (
                <p className="text-xs font-semibold mb-1" style={{ color: '#6366f1' }}>
                  Dein gr&ouml;&szlig;tes Risiko
                </p>
              )}
              <div className="flex justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-light text-gray-300">{label}</span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase"
                    style={{ backgroundColor: badge.color + '20', color: badge.color }}
                  >
                    {badge.text}
                  </span>
                </div>
                <span className="font-light text-gray-500">{c.score}/{c.maxScore}</span>
              </div>
              {subtitle && c.passed && (
                <p className="text-xs text-gray-500 mb-1">{subtitle}</p>
              )}
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(c.score / c.maxScore) * 100}%`, backgroundColor: getBarColor(c.score, c.maxScore) }}
                />
              </div>
              {!c.passed && <p className="text-xs font-light text-gray-500 mt-1">{c.hint}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
