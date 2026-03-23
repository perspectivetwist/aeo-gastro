import { FaqItem, ScrapedContent } from '@/types/aeo'

// --- Branchen-Erkennung ---

const INDUSTRY_KEYWORDS: [RegExp, string][] = [
  [/zahnarzt|zahnärzt|dental|zahnklinik|zahnmedizin/i, 'Zahnarzt'],
  [/arzt|ärzt|praxis|medizin|klinik|krankenhaus|chirurg|orthopäd|kardiol|dermatol|urolog|gynäkol|therapeut|physiotherap/i, 'Arztpraxis'],
  [/apotheke|pharma/i, 'Apotheke'],
  [/anwalt|anwält|kanzlei|rechtsanwalt|notar|jurist/i, 'Rechtsanwalt'],
  [/steuerberater|steuerkanzlei|steuerberatung|buchhalt|wirtschaftsprüf/i, 'Steuerberater'],
  [/immobili|makler|hausverwaltung|wohnung/i, 'Immobilien'],
  [/restaurant|gastronomie|gastro|bistro|café|catering|speisekarte|küche|koch|essen|menü/i, 'Gastronomie'],
  [/hotel|pension|ferienwohnung|unterkunft|übernacht/i, 'Hotellerie'],
  [/handwerk|elektriker|klempner|maler|tischler|schreiner|dachdecker|sanitär|heizung|installat/i, 'Handwerker'],
  [/friseur|frisör|salon|kosmetik|beauty|nail|wellness|spa|massage/i, 'Beauty & Wellness'],
  [/auto|kfz|werkstatt|fahrzeug|reifen|automobil|porsche|bmw|mercedes|audi|volkswagen|toyota/i, 'Automobilbranche'],
  [/versicherung|finanz|bank|kredit|vermögen|invest|anlage/i, 'Finanzdienstleister'],
  [/architekt|bau|bauunternehm|ingenieurbüro/i, 'Architektur & Bau'],
  [/fotograf|photo|video|film|medien|agentur|werbeagentur|marketing/i, 'Agentur & Medien'],
  [/software|saas|app|it-|tech|digital|cloud|hosting|webdesign|webentwickl|programmier/i, 'IT & Software'],
  [/shop|e-commerce|ecommerce|online-shop|onlineshop|warenkorb|bestell/i, 'Online-Shop'],
  [/coach|beratung|consulting|berater|trainer|schulung|seminar|weiterbildung/i, 'Beratung & Coaching'],
  [/rechtsschutz|detektiv|sicherheit|security|bewachung/i, 'Sicherheit'],
  [/logistik|transport|spedition|umzug|liefer/i, 'Logistik & Transport'],
  [/reinigung|gebäudereinigung|hausmeister|facility/i, 'Gebäudeservice'],
  [/garten|landschaft|gärtner|florist|blumen/i, 'Garten & Landschaft'],
  [/tierarzt|tierärzt|tierklinik|tierheim|haustier/i, 'Tierarzt'],
  [/fitness|sport|gym|personal train/i, 'Fitness & Sport'],
  [/mode|fashion|bekleidung|textil|schmuck|juwelier/i, 'Mode & Schmuck'],
  [/reise|tourismus|travel|touristik|urlaub/i, 'Reise & Tourismus'],
  [/musik|musiker|band|instrument|konzert/i, 'Musik'],
  [/verein|stiftung|gemeinnütz|ngo|ehrenamt/i, 'Verein & Stiftung'],
  [/bildung|schule|universität|hochschule|kita|kindergarten/i, 'Bildung'],
  [/energie|solar|photovoltaik|strom|heiz|wärmepumpe/i, 'Energie'],
  [/optik|optiker|augenarzt|brille|kontaktlinse/i, 'Optiker'],
]

export function detectIndustry(content: ScrapedContent): string {
  const searchText = `${content.title} ${content.description} ${content.bodyText.slice(0, 2000)}`
  for (const [pattern, label] of INDUSTRY_KEYWORDS) {
    if (pattern.test(searchText)) return label
  }
  return 'Websites allgemein'
}

// --- Title-Optimierung ---

export function optimizeTitle(title: string): string {
  if (!title || title.trim().length === 0) return 'Titel nicht verfügbar'
  const clean = title.trim()
  if (clean.length <= 60) return clean
  // Am Wortende kürzen
  const truncated = clean.slice(0, 57)
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 30) return truncated.slice(0, lastSpace) + '...'
  return truncated + '...'
}

// --- Description-Optimierung ---

export function optimizeDescription(description: string): string {
  if (!description || description.trim().length === 0) return 'Beschreibung nicht verfügbar'
  const clean = description.trim()
  if (clean.length <= 155) return clean
  const truncated = clean.slice(0, 152)
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 100) return truncated.slice(0, lastSpace) + '...'
  return truncated + '...'
}

// --- JSON-LD aus FAQ-Items generieren ---

export function generateJsonLd(faqItems: FaqItem[]): string {
  const mainEntity = faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }))

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  })
}

// --- Fallback: Answer Block aus Content extrahieren ---

export function extractAnswerBlock(content: ScrapedContent): string {
  const paragraphs = content.bodyText
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 80 && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('-'))

  if (paragraphs.length === 0) {
    return `${content.title} – Informationen und Details finden Sie auf der Website.`
  }

  const first = paragraphs[0]
  const words = first.split(/\s+/)
  if (words.length > 150) {
    return words.slice(0, 150).join(' ') + '...'
  }
  return first
}

// --- Fallback: FAQ-Items aus Content extrahieren ---

export function extractFaqItems(content: ScrapedContent): FaqItem[] {
  const items: FaqItem[] = []

  // Zeilen mit ? am Ende finden
  const lines = content.bodyText.split('\n').map(l => l.trim())
  for (let i = 0; i < lines.length && items.length < 5; i++) {
    const line = lines[i]
    if (line.endsWith('?') && line.length > 15 && line.length < 200) {
      const question = line.replace(/^#+\s*/, '')
      // Nächste nicht-leere Zeile als Antwort
      let answer = ''
      for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
        if (lines[j].length > 20 && !lines[j].endsWith('?') && !lines[j].startsWith('#')) {
          answer = lines[j]
          break
        }
      }
      if (answer) {
        items.push({ question, answer })
      }
    }
  }

  // Wenn <5 Items gefunden, generische Platzhalter basierend auf Title
  const domain = (() => {
    try { return new URL(content.url).hostname.replace('www.', '') } catch { return content.url }
  })()
  const fallbacks: FaqItem[] = [
    { question: `Was bietet ${domain}?`, answer: content.title || 'Informationen finden Sie auf der Website.' },
    { question: `Wie kann ich ${domain} kontaktieren?`, answer: 'Kontaktinformationen finden Sie direkt auf der Website.' },
    { question: `Welche Leistungen bietet ${domain}?`, answer: 'Details zu allen Leistungen finden Sie auf der Website.' },
    { question: `Für wen ist ${domain} geeignet?`, answer: 'Die Website richtet sich an alle Interessenten im jeweiligen Fachbereich.' },
    { question: `Warum ${domain} wählen?`, answer: 'Besuchen Sie die Website für weitere Informationen und Referenzen.' },
  ]

  while (items.length < 5) {
    items.push(fallbacks[items.length])
  }

  return items.slice(0, 5)
}
