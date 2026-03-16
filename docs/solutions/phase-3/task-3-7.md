# Task 3.7 – components/ShareButton.tsx

## Was wurde gebaut
- `components/ShareButton.tsx`: Kopiert formatierten Score-Text in Clipboard
  - Emoji basierend auf Score (🟢/🟡/🔴)
  - Text enthält Score, Domain, CTA-Link
  - Toast-Feedback: "✓ Kopiert!" für 2 Sekunden

## Was hat funktioniert
- navigator.clipboard.writeText + useState für Toast
- TypeScript: 0 Fehler
