# Tasks 2.1–2.5 – lib/scorer.ts – Alle 8 Scoring-Kriterien + calculateTotalScore()

## Was wurde gebaut
- lib/scorer.ts mit 8 Scoring-Funktionen + calculateTotalScore():
  1. checkDirectAnswer() – 25 Punkte (erster Absatz, kein Marketing-Sprech)
  2. checkJsonLdSchema() – 20 Punkte (Schema.org Markup, hochwertige Typen)
  3. checkFaqStructure() – 15 Punkte (FAQ-Heading + Fragezeichen)
  4. checkTitleDescription() – 15 Punkte (Zeichenlimits Title/Description)
  5. checkReadability() – 10 Punkte (Ø Wörter pro Satz)
  6. checkAuthorVisible() – 5 Punkte (Autor-Pattern im Text)
  7. checkDateVisible() – 5 Punkte (Datum-Pattern im Text)
  8. checkExternalLinks() – 5 Punkte (externe URLs im Text)
- calculateTotalScore() summiert alle 8 Kriterien zu AeoScore { total: 0-100, criteria[] }

## Was hat funktioniert
- Alle 5 Tasks (2.1–2.5) in einem Durchgang implementiert – Code war exakt im Plan vorgegeben
- Gewichtung summiert korrekt zu 100 (25+20+15+15+10+5+5+5)
- 0 TypeScript-Fehler

## Was war unerwartet / anders als geplant
- Alles nach Plan. Tasks 2.1–2.5 waren einzeln geplant, aber da der Code zusammengehört und aufeinander aufbaut, war Batch-Implementierung effizienter.

## Was würde man beim nächsten Mal anders machen
- Scorer-Tasks zusammenfassen statt 5 einzelne Tasks – sind alle in einer Datei
