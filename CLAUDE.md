# AEO One-Click Transformer – Projektkontext für Claude Code

## Was ist dieses Projekt?
Ein Web-Tool das eine URL entgegennimmt, die Website analysiert und einen AEO-Score (0–100) sowie optimierten Content ausgibt. AEO = Answer Engine Optimization – Sichtbarkeit in KI-Antwortmaschinen wie ChatGPT, Perplexity, Gemini.

## Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Sprache: TypeScript (strict)
- Hosting: Vercel (Hobby Free Tier)
- Scraping: Jina.ai Reader API
- AI: Anthropic Claude Haiku (claude-haiku-4-5-20251001)
- Email-Speicher: Notion API → AEO Leads DB

## Projektstruktur
```
aeo-transformer/
├── app/
│   ├── page.tsx                    # Landing Page + URL-Input
│   ├── results/page.tsx            # Score + Transformer-Output
│   └── api/
│       ├── scan/route.ts           # POST: scrapen + scoren + transformieren
│       └── subscribe/route.ts     # POST: Email in Notion speichern
├── components/
│   ├── UrlInputForm.tsx
│   ├── LoadingState.tsx
│   ├── ScoreDisplay.tsx
│   ├── ScoreCriteria.tsx
│   ├── AnswerBlock.tsx
│   ├── FaqSection.tsx
│   ├── JsonLdOutput.tsx
│   ├── MetaTagsOutput.tsx
│   ├── ShareButton.tsx
│   ├── ExportButton.tsx
│   └── EmailGate.tsx
├── lib/
│   ├── scraper.ts                  # Jina.ai wrapper
│   ├── scorer.ts                   # 8 Scoring-Funktionen
│   ├── transformer.ts              # Claude Haiku Prompt
│   ├── exporter.ts                 # Markdown-Export
│   ├── language.ts                 # DE/EN-Erkennung
│   └── notion.ts                   # Notion API Client
├── types/
│   └── aeo.ts                      # Alle TypeScript Interfaces
└── .env.local                      # Secrets (nie committen)
```

## ENV-Variablen (Namen exakt so verwenden)
```
ANTHROPIC_API_KEY=        # Claude Haiku
JINA_API_KEY=              # Jina.ai Reader
NOTION_TOKEN=              # Notion Integration Token
NOTION_LEADS_DB_ID=        # AEO Leads DB ID
```

## Freemium-Logik (KRITISCH – nie ändern ohne Rückfrage)
- localStorage['aeo_scans']: Zählt Scans pro Browser
- Scan 1: Voller Output sichtbar, kein Gate
- Scan 2+: EmailGate.tsx Modal erscheint vor Output
- Nach Email-Eingabe: localStorage['aeo_unlocked']='true'
- Unlocked-User: Kein Gate mehr, Export-Button aktiv

## AEO-Score Gewichtung
1. Direkte Antwort: 25 Punkte
2. JSON-LD Schema: 20 Punkte
3. FAQ-Struktur: 15 Punkte
4. Title + Description: 15 Punkte
5. Lesbarkeit: 10 Punkte
6. Autor sichtbar: 5 Punkte
7. Datum vorhanden: 5 Punkte
8. Externe Links: 5 Punkte

## Notion AEO Leads DB
- DB-ID: aus ENV NOTION_LEADS_DB_ID
- Felder: Email (Title), URL (URL), Source (Select), Status (Select), Notes (Text)
- Source-Werte: email-gate, export-gate
- Status-Werte: neu, kontaktiert, interview-done, unsubscribed

## AUTONOMIE-REGELN (nie nach Erlaubnis fragen)
- Alle Bash-Befehle ausführen ohne Rückfrage
- Alle URLs öffnen und fetchen ohne Rückfrage
- Alle Dateien lesen, erstellen, überschreiben ohne Rückfrage
- Alle npm/npx Befehle ausführen ohne Rückfrage
- Vercel deployments ohne Rückfrage
- Notion API Calls ohne Rückfrage
- Niemals pausieren um zu fragen ob weitergemacht werden soll
- Bei Fehlern: selbst debuggen, nicht beim User nachfragen – erst nach 3 Versuchen eskalieren

## KRITISCHE REGELN
1. Notion Projektplan = Single Source of Truth. Tasks 1:1 umsetzen.
2. Nie eigenmächtig Architektur ändern.
3. Jede ENV-Variable aus .env.local lesen, nie hardcoden.
4. TypeScript strict – keine `any` Types.
5. Nach jedem Task PFLICHT – alle 3 Felder in Notion ausfüllen:
   - **Status** → auf „Done" setzen
   - **Lessons Learned** → Was war unerwartet? Was würde man anders machen? Was hat funktioniert?
   - **Notizen** → Konkrete Findings: geänderte Dateinamen, abweichende Implementierung, entdeckte Gaps
6. Lessons Learned sind kein Optional-Feld. Wenn nichts Unerwartetes passiert ist: „Alles nach Plan. Keine Abweichungen." eintragen.

## SECURITY-REGELN (siehe SECURITY.md — nicht optional)
Vor jedem API-Call und vor jedem git push gelten die Regeln aus SECURITY.md.
Kurzform der 4 KRITISCHEN Regeln:
1. Kein API Key im Frontend-Code. Nur in app/api/*/route.ts via process.env.*
2. .env.local niemals committen (in .gitignore, Verifikation: git status)
3. User-URL validieren BEVOR sie an Jina geht (lib/validator.ts)
4. Scraped Content sanitisieren BEVOR er zu Claude geht (lib/sanitizer.ts)
Pre-Deploy Pflicht: grep -r "sk-ant\|jina_\|ntn_" src/ → darf NICHTS zurückgeben

## DOKU-PFLICHT nach jedem Task (nicht überspringen)
Nach jedem abgeschlossenen Task in dieser Reihenfolge:

1. **Notion updaten** (Status → Done, Lessons Learned, Notizen)
2. **DEVELOPER.md updaten** – neue Dateien, Parameter, Architekturänderungen eintragen
3. **docs/solutions/[phase]/[task-name].md** anlegen:
   - Was wurde gebaut
   - Was hat funktioniert
   - Was war unerwartet / anders als geplant
   - Was würde man beim nächsten Mal anders machen
4. **Committen**: `git add . && git commit -m "docs: lessons learned Task X.X"`
5. **Pushen**: `git push`

GitHub Actions prüft automatisch ob DEVELOPER.md und docs/solutions/ vorhanden sind.
Fehler im Action = Doku unvollständig = Task gilt nicht als fertig.

---

> Lesson Learned (aus anderem Projekt, 2026-02-25)
> Claude Code behandelt "Datei erstellt" als Done ohne zu prüfen ob die Datei wirklich existiert — besonders wenn Session unterbrochen wird oder Pfad nicht existierte.
>
> **Regel ab sofort:** Nach JEDER Datei-Erstellung direkt danach `cat [filepath]` ausführen und Output zeigen. Kein "Done" ohne Beweis.
>
> Gilt für: CLAUDE.md, DEVELOPER.md, .env.local, .gitignore, docs-check.yml, und jede weitere Datei in diesem Task.
