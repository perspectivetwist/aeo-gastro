import { AeoScore, ScrapedContent, ScoreCriterion } from '@/types/aeo'

// 2.1 – Direkte Antwort (25 Punkte)
export function checkDirectAnswer(content: ScrapedContent): ScoreCriterion {
  const { bodyText } = content

  // Ersten "echten" Absatz finden (kein Titel, nicht leer)
  const paragraphs = bodyText
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 50 && !p.startsWith('#'))

  const firstParagraph = paragraphs[0] || ''

  // Marketing-Sprech Patterns
  const marketingPatterns = [
    /willkommen/i, /welcome/i, /wir sind/i, /we are/i,
    /herzlich/i, /leading provider/i, /best in class/i
  ]
  const isMarketing = marketingPatterns.some(p => p.test(firstParagraph))

  // Mindestlänge und kein Marketing
  const hasDirectAnswer = firstParagraph.length > 80 && !isMarketing

  return {
    name: 'Direkte Antwort',
    score: hasDirectAnswer ? 25 : 0,
    maxScore: 25,
    passed: hasDirectAnswer,
    hint: hasDirectAnswer
      ? 'Guter erster Absatz. KI kann direkt zitieren'
      : 'Kein klarer Einstiegssatz gefunden. Beginne mit einer direkten Antwort auf die Hauptfrage der Seite.',
  }
}

// 2.2 – JSON-LD Schema (20 Punkte)
export function checkJsonLdSchema(content: ScrapedContent): ScoreCriterion {
  const { hasJsonLd, bodyText } = content

  // Prüfen ob hochwertiges Schema vorhanden
  const hasHighValueSchema =
    bodyText.includes('"FAQPage"') ||
    bodyText.includes('"HowTo"') ||
    bodyText.includes('"Article"') ||
    bodyText.includes('"Organization"') ||
    bodyText.includes('"Product"')

  let score = 0
  let hint = ''

  if (hasHighValueSchema) {
    score = 20
    hint = 'Hochwertiges JSON-LD Schema gefunden, optimal für KI-Crawler'
  } else if (hasJsonLd) {
    score = 10
    hint = 'JSON-LD vorhanden aber kein hochwertiger Typ (FAQPage, Article, HowTo). Erweitern empfohlen.'
  } else {
    score = 0
    hint = 'Kein JSON-LD gefunden. Schema.org Markup hinzufügen, besonders FAQPage oder Article.'
  }

  return {
    name: 'JSON-LD Schema',
    score,
    maxScore: 20,
    passed: score > 0,
    hint,
  }
}

// 2.3 – FAQ-Struktur (15 Punkte)
export function checkFaqStructure(content: ScrapedContent): ScoreCriterion {
  const { hasFaq, bodyText } = content

  // Anzahl echter Fragen zählen
  const questionCount = (bodyText.match(/\?/g) || []).length
  const hasFaqHeading = /\b(FAQ|Häufig gestellte Fragen|Frequently Asked|fragen & antworten)\b/i.test(bodyText)

  let score = 0
  let hint = ''

  if (hasFaqHeading && questionCount >= 5) {
    score = 15
    hint = `FAQ-Sektion mit ${questionCount} Fragen gefunden, sehr gut für Voice Search und KI-Antworten`
  } else if (hasFaq || questionCount >= 3) {
    score = 8
    hint = 'Fragen vorhanden aber keine dedizierte FAQ-Sektion. FAQ-Bereich mit Schema.org hinzufügen.'
  } else {
    score = 0
    hint = 'Keine FAQ-Struktur gefunden. FAQ-Sektion hinzufügen mit den 5 häufigsten Nutzerfragen.'
  }

  return {
    name: 'FAQ-Struktur',
    score,
    maxScore: 15,
    passed: score > 0,
    hint,
  }
}

// 2.4 – Title & Description (15 Punkte)
export function checkTitleDescription(content: ScrapedContent): ScoreCriterion {
  const { title, description } = content

  const titleLen = title.length
  const descLen = description.length

  const titleOk = titleLen >= 30 && titleLen <= 60
  const descOk = descLen >= 120 && descLen <= 155
  const titleExists = titleLen > 0
  const descExists = descLen > 0

  let score = 0
  let hint = ''

  if (titleOk && descOk) {
    score = 15
    hint = `Title (${titleLen} Zeichen) und Description (${descLen} Zeichen) optimal`
  } else if (titleExists && descExists) {
    score = 8
    const issues = []
    if (!titleOk) issues.push(`Title ${titleLen < 30 ? 'zu kurz' : 'zu lang'} (${titleLen}/60 Zeichen)`)
    if (!descOk) issues.push(`Description ${descLen < 120 ? 'zu kurz' : 'zu lang'} (${descLen}/155 Zeichen)`)
    hint = issues.join('. ') + '. Optimale Längen: Title 30-60, Description 120-155 Zeichen.'
  } else {
    score = 0
    hint = `${!titleExists ? 'Kein Meta-Title' : ''}${!descExists ? ' Keine Meta-Description' : ''} gefunden. Beide sind Pflicht für KI-Sichtbarkeit.`
  }

  return {
    name: 'Title & Description',
    score,
    maxScore: 15,
    passed: score > 0,
    hint,
  }
}

// 2.5 – Lesbarkeit (10 Punkte)
export function checkReadability(content: ScrapedContent): ScoreCriterion {
  const { bodyText } = content
  const sentences = bodyText.split(/[.!?]+/).filter(s => s.trim().length > 20)
  const avgWordsPerSentence = sentences.length > 0
    ? bodyText.split(' ').length / sentences.length
    : 999

  const passed = avgWordsPerSentence <= 20 && avgWordsPerSentence > 0
  return {
    name: 'Lesbarkeit',
    score: passed ? 10 : 5,
    maxScore: 10,
    passed,
    hint: passed
      ? 'Kurze, klare Sätze, gut für KI-Verständnis'
      : `Ø ${Math.round(avgWordsPerSentence)} Wörter/Satz. Ideal: unter 20 Wörter/Satz.`,
  }
}

// 2.5 – Autor sichtbar (5 Punkte)
export function checkAuthorVisible(content: ScrapedContent): ScoreCriterion {
  return {
    name: 'Autor sichtbar',
    score: content.hasAuthor ? 5 : 0,
    maxScore: 5,
    passed: content.hasAuthor,
    hint: content.hasAuthor
      ? 'Autor erkannt, stärkt E-E-A-T Signal'
      : 'Kein Autor gefunden. Autorenangabe hinzufügen (Name + Rolle).',
  }
}

// 2.5 – Datum vorhanden (5 Punkte)
export function checkDateVisible(content: ScrapedContent): ScoreCriterion {
  return {
    name: 'Datum vorhanden',
    score: content.hasDate ? 5 : 0,
    maxScore: 5,
    passed: content.hasDate,
    hint: content.hasDate
      ? 'Datum erkannt. KI weiß dass Content aktuell ist'
      : 'Kein Datum gefunden. Veröffentlichungs- oder Update-Datum hinzufügen.',
  }
}

// 2.5 – Externe Links (5 Punkte)
export function checkExternalLinks(content: ScrapedContent): ScoreCriterion {
  return {
    name: 'Externe Links',
    score: content.hasExternalLinks ? 5 : 0,
    maxScore: 5,
    passed: content.hasExternalLinks,
    hint: content.hasExternalLinks
      ? 'Externe Quellen verlinkt, signalisiert Vertrauenswürdigkeit'
      : 'Keine externen Links. Quellen und weiterführende Ressourcen verlinken.',
  }
}

// Gesamt-Score berechnen (Summe aller 8 Kriterien = max 100)
export function calculateTotalScore(content: ScrapedContent): AeoScore {
  const criteria = [
    checkDirectAnswer(content),
    checkJsonLdSchema(content),
    checkFaqStructure(content),
    checkTitleDescription(content),
    checkReadability(content),
    checkAuthorVisible(content),
    checkDateVisible(content),
    checkExternalLinks(content),
  ]

  const total = criteria.reduce((sum, c) => sum + c.score, 0)

  return { total, criteria }
}
