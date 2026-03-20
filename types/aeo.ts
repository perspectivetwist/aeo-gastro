// Input
export interface ScanRequest {
  url: string
}

// Jina.ai Scraper Output
export interface ScrapedContent {
  url: string
  title: string
  description: string
  bodyText: string        // Volltext der Seite
  hasJsonLd: boolean
  jsonLdRaw: string | null
  hasFaq: boolean
  hasAuthor: boolean
  hasDate: boolean
  hasExternalLinks: boolean
  language: 'de' | 'en' | 'unknown'
}

// Ein einzelnes Scoring-Kriterium
export interface ScoreCriterion {
  name: string
  score: number           // Erreichte Punkte (0 bis maxScore)
  maxScore: number        // Maximale Punkte für dieses Kriterium
  passed: boolean
  hint: string            // Kurze Erklärung für den User
}

// Gesamt-Score-Ergebnis
export interface AeoScore {
  total: number           // 0–100
  criteria: ScoreCriterion[]
}

// Claude Haiku Transformer Output
export interface TransformerOutput {
  answerBlock: string     // Direkte Antwort (<150 Wörter, KI-zitierbar)
  faqItems: FaqItem[]     // 5 Fragen + Antworten
  jsonLd: string          // JSON-LD als String (Schema.org)
  metaTitle: string       // Max 60 Zeichen
  metaDescription: string // Max 155 Zeichen
  industry: string        // Erkannte Branche (z.B. "Zahnarzt", "SaaS-Anbieter")
}

export interface FaqItem {
  question: string
  answer: string
}

export interface KiSummary {
  zusammenfassung: string
}

// Vollständiges Scan-Ergebnis (API Response)
export interface ScanResult {
  url: string
  score: AeoScore
  transformer: TransformerOutput
  kiSummary?: KiSummary
  language: 'de' | 'en' | 'unknown'
  scannedAt: string       // ISO Timestamp
}

// API Error Response
export interface ApiError {
  error: string
  details?: string
}
