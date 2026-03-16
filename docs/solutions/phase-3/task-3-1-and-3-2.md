# Task 3.1 + 3.2 – Landing Page + UrlInputForm

## Was wurde gebaut
- **app/page.tsx**: Vollständige Landing Page mit 4 Sektionen:
  1. Above-the-fold Hero: Headline, Subtitle, UrlInputForm
  2. 3 Statistik-Kacheln (69% Zero-Click, 800M ChatGPT User, 90% unsichtbar)
  3. 6er Feature-Grid "Was du bekommst" (Score, AnswerBlock, FAQ, JSON-LD, Meta, Share)
  4. Footer CTA mit zweitem UrlInputForm
- **components/UrlInputForm.tsx**: Client Component mit URL-Eingabe + Navigation
  - useState für url, error, loading
  - Client-seitige Validierung (leeres Feld)
  - Navigation zu `/results?url=...` via useRouter

## Was hat funktioniert
- TypeScript: `npx tsc --noEmit` — 0 Fehler
- Dev Server: Landing Page lädt auf localhost:3000 mit HTTP 200
- Responsive Design: sm: Breakpoints für Mobile/Desktop
- Tailwind CSS v4: @theme color variables korrekt referenziert (text-primary, bg-primary)
- UrlInputForm: Wird zweimal verwendet (Hero + Footer CTA) — DRY

## Was war unerwartet / anders als geplant
- Nichts — straightforward UI-Build

## Was würde man beim nächsten Mal anders machen
- Nichts — Pattern ist klar für die weiteren Komponenten
