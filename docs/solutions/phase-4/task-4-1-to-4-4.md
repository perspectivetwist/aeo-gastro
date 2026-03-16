# Tasks 4.1–4.4 – OG Tags, Favicon, Analytics, Email-Speicher

## Task 4.1 – Open Graph Tags
- `app/layout.tsx`: Metadata mit og:title, og:description, og:url, og:siteName, twitter:card
- Ermöglicht schöne Vorschau beim Teilen auf LinkedIn/Twitter

## Task 4.2 – Favicon + App-Name
- `app/icon.tsx`: Generiertes Favicon (lila "A" auf indigo Hintergrund)
- Title: "AEO Transformer – KI-Sichtbarkeit messen"
- lang="de" statt default "en"

## Task 4.3 – Vercel Analytics
- `npm install @vercel/analytics`
- `<Analytics />` Component in layout.tsx eingebunden
- Dashboard-Aktivierung muss manuell in Vercel UI erfolgen

## Task 4.4 – Email-Speicher (Notion DB)
- `lib/notion.ts`: saveEmailLead() Funktion — schreibt in AEO Leads DB
- `app/api/subscribe/route.ts`: Refactored to use lib/notion.ts
- Felder: Email (title), URL gescannt (url), Source (select), Status (select)
- Timestamp wird automatisch von Notion gesetzt (created_time)
- Verifiziert: Test-Lead "test@aeo-transformer.dev" erfolgreich in Notion gespeichert

## Lessons Learned
- Notion created_time Felder NICHT im API-Call mitsenden — verursacht 500er
- Notion DB-Schema IMMER vorher fetchen statt aus Spec-Docs raten
- @vercel/analytics erfordert manuelle Aktivierung im Vercel Dashboard
