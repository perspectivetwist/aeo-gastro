# Task 1.1 – Next.js Projekt aufsetzen

## Was wurde gebaut
- Next.js 16 (latest, App Router) mit TypeScript strict, Tailwind CSS
- Anthropic SDK (@anthropic-ai/sdk) installiert
- Default-Seiten bereinigt (page.tsx minimal, globals.css nur Tailwind, public/ leer)
- Ordnerstruktur angelegt: components/, lib/, types/, app/results/, app/api/scan/, app/api/subscribe/
- Vercel Projekt verbunden und deployed: https://aeo-transformer.vercel.app
- GitHub Repo gepusht

## Was hat funktioniert
- create-next-app Workaround: in Temp-Ordner erstellt, dann rsync in bestehendes Projekt
- npm Cache-Problem mit alternativem Cache-Pfad (/tmp/npm-cache) gelöst
- Vercel CLI Login via Device Code Flow
- Erster Deploy erfolgreich

## Was war unerwartet / anders als geplant
- create-next-app weigert sich bei existierenden Dateien → Temp-Ordner + rsync Workaround nötig
- npm Cache hatte root-owned Files (von früherem sudo npm) → konnte ohne sudo nicht bereinigt werden, npm_config_cache=/tmp/npm-cache als Workaround
- Next.js Version ist 16.1.6 statt 14 (Plan sagt 14, aber create-next-app@latest installiert neueste)
- Vercel GitHub Integration braucht separate "Login Connection" → Auto-Deploy via git push nicht aktiv, manuelles `npx vercel --prod` nötig

## Was würde man beim nächsten Mal anders machen
- create-next-app ZUERST ausführen, dann CLAUDE.md etc. hinzufügen
- npm Cache-Ownership vorab prüfen/fixen
- Next.js Version pinnen wenn Plan eine spezifische Version vorgibt
