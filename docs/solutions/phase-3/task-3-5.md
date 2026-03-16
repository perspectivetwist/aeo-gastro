# Task 3.5 – ScoreCriteria + AnswerBlock + FaqSection + JsonLdOutput + MetaTagsOutput

## Was wurde gebaut
5 Display-Komponenten in einem Task:
1. `components/ScoreCriteria.tsx` – 8 Kriterien als Progress-Bars mit Score/MaxScore
2. `components/AnswerBlock.tsx` – KI-zitierbarer Antwort-Absatz
3. `components/FaqSection.tsx` – FAQ-Items mit Frage + Antwort
4. `components/MetaTagsOutput.tsx` – Meta Title + Description mit Zeichenzähler
5. `components/JsonLdOutput.tsx` – JSON-LD Code-Block mit Copy-Button (Client Component)

## Was hat funktioniert
- Alle 5 Komponenten: TypeScript 0 Fehler
- Nur JsonLdOutput braucht 'use client' (für Copy-Button mit useState)
- Alle Props korrekt aus types/aeo.ts referenziert
