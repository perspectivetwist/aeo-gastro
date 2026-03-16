# Task 3.9 – components/EmailGate.tsx + /api/subscribe

## Was wurde gebaut
- `components/EmailGate.tsx`: Modal-Overlay für Email-Eingabe
  - Erscheint bei Scan 2+ wenn noch nicht unlocked
  - Validiert Email (@-Check), sendet an /api/subscribe
  - onSuccess() Callback → localStorage unlock + Modal schließen
- `app/api/subscribe/route.ts`: POST Endpoint
  - Schreibt Email + URL + Timestamp in Notion "AEO Leads" DB
  - Verwendet Notion API v2022-06-28 mit NOTION_TOKEN + NOTION_LEADS_DB_ID

## Was hat funktioniert
- TypeScript: 0 Fehler
- Modal als Fixed Overlay mit bg-black/50 Backdrop
- Error Handling: 400 (invalid email), 500 (config missing), 502 (Notion API)
