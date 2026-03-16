# AEO One-Click Transformer – Developer Documentation

## Was ist das?
Single-Page Web-App: URL eingeben → AEO-Score + optimierter Content.
Stack: Next.js 14 (App Router) + Tailwind + TypeScript + Vercel.

## Dateistruktur
```
aeo-transformer/
├── app/
│   ├── page.tsx               # Landing Page + URL-Input
│   ├── scanning/page.tsx      # Scan-Ladescreen (Step-Loading)
│   ├── results/page.tsx       # Score + Transformer-Output
│   └── api/
│       ├── scan/route.ts      # POST: scrapen + scoren + transformieren
│       └── subscribe/route.ts # POST: Email in Notion speichern
├── components/                # Alle UI-Komponenten (siehe CLAUDE.md)
├── lib/                       # Business-Logik (scraper, scorer, transformer)
├── types/aeo.ts               # TypeScript Interfaces
├── docs/solutions/            # Lessons Learned pro Task (auto-generiert)
├── .github/workflows/         # GitHub Actions (Doku-Check)
├── CLAUDE.md                  # Claude Code Kontext
├── DEVELOPER.md               # Diese Datei
└── .env.local                 # Secrets (nie committen!)
```

## Lokale Entwicklung
npm run dev → http://localhost:3000

## Deployment
git push origin main → Vercel deployed automatisch (verbunden via Task 1.1)

## ENV-Variablen
ANTHROPIC_API_KEY    – Claude Haiku
JINA_API_KEY         – Jina.ai Reader (Scraping)
NOTION_TOKEN         – Notion Integration
NOTION_LEADS_DB_ID   – AEO Leads Datenbank

## Architektur (Kurzform)
Landing Page → /scanning (Step-Loading + API-Call) → sessionStorage → /results (liest Cache, Fallback API)
API-Pipeline: URL → Jina.ai (Scraping) → scorer.ts (8 Kriterien, kein AI) → transformer.ts (Claude Haiku) → JSON Response

## Bekannte Limitierungen
- localStorage Gate: kein echter Schutz, nur UX-Gate für V0
- Kein Rate-Limiting gegen PubMed/Jina in V0
- Vercel Hobby: max. 60 Sek. Function Runtime

## Nach jedem Task aktualisieren
Wenn neue Parameter, Dateien oder Architekturänderungen entstehen → dieses File updaten.
Lessons Learned → docs/solutions/[phase]/[task].md
