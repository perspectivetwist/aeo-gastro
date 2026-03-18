export default function JsonLdSchema() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Shift Drift",
    "url": "https://ai-gastro-hub.vercel.app",
    "sameAs": ["https://github.com/perspectivetwist"]
  }

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AEO Gastro Scanner",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was macht den AEO Transformer einzigartig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 20 Sekunden analysiert unsere KI deine Restaurant-Website nach den gleichen Kriterien, nach denen ChatGPT, Perplexity & Co. Antworten auswählen. Du bekommst sofort einsatzbereiten, optimierten Content: kein Account, keine Agentur, kein Warten. Einfach URL eingeben, fertig."
        }
      },
      {
        "@type": "Question",
        "name": "Warum gibt es den AEO Scanner und warum jetzt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weil die meisten Restaurant-Websites von KI-Suchmaschinen nicht verstanden werden, und die Inhaber es nicht wissen. ChatGPT, Perplexity & Co. beantworten Fragen direkt. Wer nicht zitiert wird, existiert nicht. 58% der Konsumenten nutzen KI-Tools statt Google für Produkt- und Servicesuche (Capgemini 2025). +527% Anstieg KI-generierter Website-Referrals in nur 5 Monaten (Previsible Jan-Mai 2025). 25% aller Suchanfragen wandern bis 2028 zu KI-Engines (Gartner). 800 Mio. wöchentliche ChatGPT-Nutzer, Stand Ende 2025 (OpenAI). AI Search Traffic konvertiert mit 14,2%, fünfmal besser als Google mit 2,8%. Der AEO Scanner macht in 20 Sekunden sichtbar ob deine Restaurant-Website KI-lesbar ist und liefert sofort optimierten Content zum Einbauen."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist AEO und warum brauche ich das?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AEO (Answer Engine Optimization) optimiert deine Restaurant-Website für KI-Suchmaschinen. Während Google Links rankt, wählen ChatGPT und Perplexity direkte Antworten aus. Mit AEO sicherst du dir Sichtbarkeit in KI-Antworten, ohne traditionelles Ranking."
        }
      },
      {
        "@type": "Question",
        "name": "Wie funktioniert der AEO Transformer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Du gibst deine URL ein, die KI analysiert deinen Content nach den gleichen Kriterien wie ChatGPT und Perplexity. In 20 Sekunden erhältst du einen Score und einsatzbereiten, optimierten Content mit JSON-LD Schema und Meta-Tags."
        }
      },
      {
        "@type": "Question",
        "name": "Was zeigt der AEO-Score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Score (0-100) misst, wie gut deine Restaurant-Website für KI-Zitierung optimiert ist. Er berücksichtigt Content-Struktur, Klarheit der Antworten und technisches Markup, direkt vergleichbar mit dem Standard von ChatGPT & Co."
        }
      },
      {
        "@type": "Question",
        "name": "Brauche ich einen Account oder Installation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. Der AEO Transformer ist völlig kostenlos, ohne Account und ohne Installation. URL eingeben, warten, Ergebnis kopieren. DSGVO-konform und ohne Datenspeicherung."
        }
      },
      {
        "@type": "Question",
        "name": "Wer sollte AEO Optimization machen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alle Gastronomiebetriebe profitieren: Restaurants, Cafés, Hotels, Catering-Unternehmen und Franchise-Ketten. Besonders wichtig für Betriebe die Reservierungen, Speisekarten und Angebote online haben, denn diese Inhalte werden von KI-Suchmaschinen zitiert."
        }
      },
      {
        "@type": "Question",
        "name": "Wie aktuell ist die Analyse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Analyse läuft in Echtzeit."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  )
}
