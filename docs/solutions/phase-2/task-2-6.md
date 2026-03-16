# Task 2.6 – lib/transformer.ts – Claude Haiku Prompt + JSON-Parser

## Was wurde gebaut
- lib/transformer.ts: transformContent(ScrapedContent) → TransformerOutput
- Claude Haiku API Call mit strukturiertem JSON-Prompt
- Markdown-Fence Stripping für JSON-Parsing
- Sprachadaptiv: DE/EN basierend auf content.language

## Was hat funktioniert
- Claude Haiku gibt valides JSON zurück (example.com Test)
- JSON-Parse ohne Fehler
- metaTitle 48 Zeichen (unter 60), metaDescription 129 Zeichen (unter 155)

## Was war unerwartet / anders als geplant
- Haiku gibt nur 3 statt 5 FAQ-Items für example.com (wenig Content → wenig Fragen). Bei echten Seiten mit mehr Content kommen 5.
- answerBlock ist 742 Zeichen (Plan sagt max 150 Wörter ≈ ~900 Zeichen). Passt.

## Was würde man beim nächsten Mal anders machen
- faqItems.length validieren und ggf. auffüllen falls <5
