# Task 2.8 – API Endpoint lokal testen (3+ echte URLs)

## Was wurde gebaut
- Kein Code — reiner Testlauf der bestehenden Pipeline

## Testergebnisse

| Test | URL | Score | Language | FAQ Items | Zeit |
|---|---|---|---|---|---|
| 1 | konfuzio.com/de/ | 41/100 | de | 5 | ~41s |
| 2 | example.com | 48/100 | en | 3 | ~8s |
| 3 | "keine-url" | Error 422 | - | - | <1s |

## Was hat funktioniert
- Pipeline End-to-End: scrape → score → transform → JSON Response
- Spracherkennung korrekt: konfuzio = de, example = en
- Error Handling: ungültige URL gibt 422, kein 500er-Crash
- AnswerBlock auf Deutsch für konfuzio, Englisch für example.com

## Was war unerwartet / anders als geplant
- konfuzio.com braucht ~41 Sekunden (Jina scraping langsam bei großen Seiten). Vercel Timeout ist 60s — wird knapp bei komplexen Seiten.
- example.com Score (48) ist HÖHER als konfuzio.com (41) — weil example.com trotz wenig Content eine klare direkte Antwort hat (25 Punkte) und gute Lesbarkeit (10 Punkte). konfuzio.com verliert Punkte bei JSON-LD und FAQ.
- AnswerBlock für example.com kam auf Deutsch statt Englisch — Language Detection gibt 'en' aber Claude antwortet trotzdem manchmal auf Deutsch. Nicht kritisch für V0.

## Was würde man beim nächsten Mal anders machen
- Timeout-Handling einbauen: wenn Jina >30s braucht, abbrechen
- Language instruction im Prompt verstärken (z.B. "You MUST respond in English")
