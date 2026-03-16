# Task 1.2 – Tailwind CSS + TypeScript konfigurieren

## Was wurde gebaut
- Tailwind v4 Custom Color `primary: #6366f1` via @theme Block in globals.css
- TypeScript strict mode verifiziert (war bereits durch create-next-app gesetzt)
- Test: text-primary Klasse funktioniert im Browser

## Was hat funktioniert
- tsconfig.json war bereits korrekt aus create-next-app (strict: true, paths konfiguriert)
- Tailwind v4 @theme Block für Custom Colors funktioniert sauber

## Was war unerwartet / anders als geplant
- Plan sagt tailwind.config.ts erstellen, aber Next.js 16 nutzt Tailwind v4 mit CSS-basierter Config (@theme in globals.css statt tailwind.config.ts)
- Kein tailwind.config.ts nötig, content-Pfade werden automatisch erkannt

## Was würde man beim nächsten Mal anders machen
- Plan an Tailwind v4 Syntax anpassen wenn Next.js latest verwendet wird
