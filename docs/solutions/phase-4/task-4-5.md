# Task 4.5 – End-to-End Test (Production)

## Testergebnisse

| # | URL | Score | Language | FAQ | Status |
|---|---|---|---|---|---|
| 1 | example.com | 48/100 | en | 5 | OK |
| 2 | konfuzio.com/de/ | 41/100 | de | 5 | OK |
| 3 | anthropic.com | 58/100 | en | 5 | OK |
| 4 | "keine-url" | 422 | - | - | Error korrekt |
| 5 | Subscribe API | success | - | - | Lead in Notion |

## Was hat funktioniert
- Alle 3 echten URLs: Score + 8 Kriterien + AnswerBlock + FAQ + Meta + JSON-LD
- Subscribe: Lead korrekt in Notion AEO Leads DB (Email + URL + Source + Status)
- Error Handling: Ungültige URL gibt 422 mit Fehlermeldung

## Was war unerwartet
- Vercel ENV-Variablen hatten trailing `\n` (echo vs printf). Notion API warf 400: "database_id should be a valid uuid".
  Fix: `printf` statt `echo` bei `vercel env add` verwenden.
- Scan API funktionierte sofort (ANTHROPIC + JINA Keys), Subscribe nicht (NOTION_LEADS_DB_ID mit Newline).

## Lessons Learned
- **IMMER `printf` statt `echo` bei `vercel env add`** — echo fügt Newline an
- Nach jedem Vercel ENV-Update: Redeploy nötig
- Notion Search Indexing hat Delay — direkt Query nutzen für sofortige Verifizierung
