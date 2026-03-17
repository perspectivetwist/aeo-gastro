'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, ServerOff, MapPin } from 'lucide-react'

const faqItems = [
  {
    question: 'Was macht den AEO Transformer einzigartig?',
    answer: 'In 20 Sekunden analysiert unsere KI deine Restaurant-Website nach den gleichen Kriterien, nach denen ChatGPT, Perplexity & Co. Antworten auswählen. Du bekommst sofort einsatzbereiten, optimierten Content: kein Account, keine Agentur, kein Warten. Einfach URL eingeben, fertig.',
    alwaysOpen: true,
  },
  {
    question: 'Warum gibt es den AEO Scanner und warum jetzt?',
    answer: 'Weil die meisten Restaurant-Websites von KI-Suchmaschinen nicht verstanden werden, und die Inhaber es nicht wissen.\n\nChatGPT, Perplexity & Co. beantworten Fragen direkt. Wer nicht zitiert wird, existiert nicht. Die Zahlen:\n\n• 58% der Konsumenten nutzen KI-Tools statt Google für Produkt- und Servicesuche (Capgemini 2025)\n• +527% Anstieg KI-generierter Website-Referrals in nur 5 Monaten (Previsible Jan-Mai 2025)\n• 25% aller Suchanfragen wandern bis 2028 zu KI-Engines (Gartner)\n• 800 Mio. wöchentliche ChatGPT-Nutzer, Stand Ende 2025 (OpenAI)\n• AI Search Traffic konvertiert mit 14,2%, fünfmal besser als Google mit 2,8%\n\nDer AEO Scanner macht in 20 Sekunden sichtbar ob deine Restaurant-Website KI-lesbar ist und liefert sofort optimierten Content zum Einbauen.',
  },
  {
    question: 'Was ist AEO und warum brauche ich das?',
    answer: 'AEO (Answer Engine Optimization) optimiert deine Restaurant-Website für KI-Suchmaschinen. Während Google Links rankt, wählen ChatGPT und Perplexity direkte Antworten aus. Mit AEO sicherst du dir Sichtbarkeit in KI-Antworten, ohne traditionelles Ranking.',
  },
  {
    question: 'Wie funktioniert der AEO Transformer?',
    answer: 'Du gibst deine URL ein, die KI analysiert deinen Content nach den gleichen Kriterien wie ChatGPT und Perplexity. In 20 Sekunden erhältst du einen Score und einsatzbereiten, optimierten Content mit JSON-LD Schema und Meta-Tags.',
  },
  {
    question: 'Was zeigt der AEO-Score?',
    answer: 'Der Score (0-100) misst, wie gut deine Restaurant-Website für KI-Zitierung optimiert ist. Er berücksichtigt Content-Struktur, Klarheit der Antworten und technisches Markup, direkt vergleichbar mit dem Standard von ChatGPT & Co.',
  },
  {
    question: 'Brauche ich einen Account oder Installation?',
    answer: 'Nein. Der AEO Transformer ist völlig kostenlos, ohne Account und ohne Installation. URL eingeben, warten, Ergebnis kopieren. DSGVO-konform und ohne Datenspeicherung.',
  },
  {
    question: 'Wer sollte AEO Optimization machen?',
    answer: 'Alle Gastronomiebetriebe profitieren: Restaurants, Cafés, Hotels, Catering-Unternehmen und Franchise-Ketten. Besonders wichtig für Betriebe die Reservierungen, Speisekarten und Angebote online haben, denn diese Inhalte werden von KI-Suchmaschinen zitiert.',
  },
  {
    question: 'Wie aktuell ist die Analyse?',
    answer: 'Die Analyse läuft in Echtzeit.',
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
