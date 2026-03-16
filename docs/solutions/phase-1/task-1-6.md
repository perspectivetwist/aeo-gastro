# Task 1.6 – lib/scraper.ts – Jina.ai Wrapper bauen + testen

## Was wurde gebaut
- lib/scraper.ts: scrapeUrl(url) → ScrapedContent
- Jina.ai Reader API Integration mit Bearer Auth
- Parsing: Titel, Description, JSON-LD, FAQ, Autor, Datum, externe Links, Spracherkennung
- bodyText auf 10k Zeichen begrenzt (für Claude Token-Limit)

## Was hat funktioniert
- 1:1 aus Plan übernommen
- Jina.ai gibt sauberen Markdown zurück
- Spracherkennung via Wort-Frequenz (deutsch vs. englisch) funktioniert für einfache Fälle

## Was war unerwartet / anders als geplant
- example.com hat keinen H1 Tag → title fällt auf URL zurück (korrekt so)
- dotenv als devDependency installiert für Testskript (wird in Next.js nicht gebraucht, da .env.local automatisch geladen)

## Was würde man beim nächsten Mal anders machen
- Testskript als npx tsx statt .mjs schreiben, um direkt TypeScript + Path Aliases nutzen zu können
