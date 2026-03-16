# Task 1.7 – lib/language.ts – Sprach-Detection implementieren

## Was wurde gebaut
- lib/language.ts: detectLanguage(text) → 'de' | 'en' | 'unknown'
- Erweiterte Wortlisten (30 deutsche, 30 englische Stoppwörter)
- Ratio-basierte Erkennung mit Threshold 0.55/0.45
- Minimum 10 Wörter für valide Erkennung
- scraper.ts refactored: inline-Logik durch import von detectLanguage ersetzt

## Was hat funktioniert
- Extraktion aus scraper.ts war straightforward
- Alle 3 Testfälle bestanden: de, en, unknown

## Was war unerwartet / anders als geplant
- Alles nach Plan. Keine Abweichungen.

## Was würde man beim nächsten Mal anders machen
- Nichts — saubere Extraktion.
