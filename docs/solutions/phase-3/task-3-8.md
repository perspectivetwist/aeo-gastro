# Task 3.8 – components/ExportButton.tsx + lib/exporter.ts

## Was wurde gebaut
- `lib/exporter.ts`: generateExportText() + downloadAsText()
  - Formatiert ScanResult als strukturierte .txt Datei
  - 5 Sektionen: Answer Block, FAQ, Meta Title, Meta Description, JSON-LD
- `components/ExportButton.tsx`: Triggert Download als .txt
  - Nur sichtbar wenn aeo_unlocked (nach EmailGate)

## Was war unerwartet / anders als geplant
- Type-Mismatch: Notion-Spec nutzte `score.totalScore` und `transformer.faq`, aber types/aeo.ts hat `score.total` und `transformer.faqItems`. Fix: exporter.ts an korrekte Types angepasst.
