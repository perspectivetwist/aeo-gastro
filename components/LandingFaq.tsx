'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was ist KI-Sichtbarkeit für Restaurants?',
    answer: 'Wenn jemand ChatGPT, Perplexity oder Google AI fragt "Welches Restaurant empfiehlst du in Berlin?", durchsuchen diese KI-Systeme das Internet. Restaurants die schlecht strukturierte Websites haben werden nicht gefunden und nicht empfohlen — egal wie gut das Essen ist.',
    alwaysOpen: true,
  },
  {
    question: 'Was prüft der AEO-Scanner für mein Restaurant?',
    answer: 'Der Scanner analysiert 8 Kriterien: Ob deine Website maschinenlesbar ist, ob du FAQ-Inhalte hast, ob deine Öffnungszeiten strukturiert vorliegen, ob deine Speisekarte von KI gelesen werden kann, ob dein Google Business Profile vollständig ist, ob du Schema Markup hast, ob deine Seite schnell lädt und ob dein Impressum korrekt ist.',
  },
  {
    question: 'Wie lange dauert der Scan?',
    answer: '60 Sekunden. Du gibst deine Website-URL ein, wir analysieren automatisch alle 8 Kriterien und zeigen dir deinen Score mit konkreten Verbesserungsvorschlägen.',
  },
  {
    question: 'Was kostet der Scan?',
    answer: 'Der Scan ist kostenlos. Du bekommst deinen Score und eine Übersicht der Kriterien. Den vollständigen Aktionsplan mit priorisierten Schritten gibt es nach Email-Eingabe.',
  },
  {
    question: 'Was ist der Unterschied zwischen AEO und GEO für Restaurants?',
    answer: 'AEO (Answer Engine Optimization) optimiert deine Website damit KI-Systeme sie lesen und zitieren können. GEO (Generative Engine Optimization) optimiert deinen digitalen Ruf — Bewertungen, Erwähnungen, Brancheneinträge. Beides zusammen macht dein Restaurant vollständig KI-sichtbar.',
  },
  {
    question: 'Mein Restaurant hat viele Google-Bewertungen — warum findet mich ChatGPT trotzdem nicht?',
    answer: 'Google-Bewertungen allein reichen nicht. ChatGPT liest primär strukturierte Website-Inhalte. Wenn deine Website kein Schema Markup hat, keine FAQ-Seite und keinen maschinenlesbaren Content — bleibt dein Restaurant unsichtbar, egal wie viele Sterne du hast.',
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
