'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was ist AEO und warum ist es wichtig für mein Restaurant?',
    answer: 'AEO (Answer Engine Optimization) sorgt dafür, dass ChatGPT und Google dein Restaurant als Quelle zitieren. Ohne AEO empfiehlt die KI die Konkurrenz — nicht dich.',
    alwaysOpen: true,
  },
  {
    question: 'Wie funktioniert der AEO Scanner für Restaurants?',
    answer: 'Du gibst deine Restaurant-URL ein. Der Scanner prüft in 30 Sekunden 8 Kriterien: Schema Markup, FAQ-Struktur, Antwortblöcke, Metadaten und mehr. Du bekommst einen Score von 0–100.',
  },
  {
    question: 'Was bedeutet KI-Sichtbarkeit für mein Restaurant?',
    answer: 'KI-Sichtbarkeit bedeutet: Wenn jemand ChatGPT fragt „Wo esse ich gut in Berlin?", wird dein Restaurant genannt — nicht nur auf Google gefunden.',
  },
  {
    question: 'Kostet der AEO Scanner etwas?',
    answer: 'Nein. Der Scan ist komplett kostenlos, ohne Kreditkarte. Du siehst deinen Score und die wichtigsten Probleme sofort.',
  },
  {
    question: 'Was ist der Unterschied zwischen SEO und AEO für Restaurants?',
    answer: 'SEO optimiert für Google-Suchergebnisse. AEO optimiert für KI-Antworten — ChatGPT, Perplexity, Google AI Overviews. Beides braucht dein Restaurant heute.',
  },
  {
    question: 'Wie schnell sehe ich Ergebnisse nach einer AEO-Optimierung?',
    answer: 'Google AI Overviews aktualisieren sich alle 2–4 Wochen. Nach der Optimierung prüfe mit dem Scanner ob dein Score gestiegen ist.',
  },
]

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = item.alwaysOpen || openIndex === i
        return (
          <div
            key={i}
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                if (item.alwaysOpen) return
                setOpenIndex(openIndex === i ? null : i)
              }}
              className={`w-full flex items-center justify-between p-4 sm:p-6 text-left ${item.alwaysOpen ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="font-medium text-white text-sm pr-4">{item.question}</span>
              {!item.alwaysOpen && (
                isOpen
                  ? <ChevronUp size={18} className="text-purple-400 shrink-0" />
                  : <ChevronDown size={18} className="text-purple-400 shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 -mt-2">
                <p className="text-gray-300 text-sm font-light leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
                {item.alwaysOpen && (
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield size={14} className="text-purple-400" />
                      DSGVO-konform
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ServerOff size={14} className="text-purple-400" />
                      Keine Datenspeicherung
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-purple-400" />
                      Made in Germany
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
