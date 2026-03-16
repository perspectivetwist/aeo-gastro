# AEO One-Click Transformer – Security Policy

## KRITISCHE REGELN (Verstoß = sofort fixen)

### 1. Kein API Key im Frontend
- API Keys NUR in `app/api/*/route.ts` via `process.env.*`
- Niemals in Components, lib/-Dateien die client-side laufen, oder hardcoded
- Pre-Deploy Check: `grep -r "sk-ant\|jina_\|ntn_" src/ app/ lib/ components/` → muss leer sein

### 2. .env.local nie committen
- `.env.local` steht in `.gitignore`
- Verifikation vor jedem Push: `git status` → `.env.local` darf NICHT auftauchen
- API Keys nur über Vercel Environment Variables oder lokale .env.local

### 3. User-Input validieren (SSRF-Schutz)
- User-URL validieren BEVOR sie an Jina.ai geht
- Nur HTTP/HTTPS erlauben (kein file://, ftp://, data://)
- Private IPs blocken (127.0.0.1, 10.x, 192.168.x, 172.16-31.x)
- Implementierung: `lib/validator.ts`

### 4. Scraped Content sanitisieren (Prompt Injection Schutz)
- Content von Jina.ai sanitisieren BEVOR er an Claude Haiku geht
- Bekannte Injection-Patterns entfernen
- Implementierung: `lib/sanitizer.ts`
- Referenz: OWASP LLM01 (Indirect Prompt Injection)

## WICHTIGE REGELN

### 5. Rate Limiting
- API Routes brauchen Rate Limiting (Denial of Wallet — OWASP LLM10)
- V0: Einfaches In-Memory Rate Limit reicht
- Limit: max 10 Scans pro Minute pro IP

### 6. LLM Output validieren
- Claude Haiku Output validieren bevor er im Frontend angezeigt wird
- JSON-Schema Validierung auf Transformer-Output
- XSS-Schutz: kein rohes HTML aus LLM-Output rendern (OWASP LLM02)

### 7. Least Privilege
- Jeder API Token nur mit minimalem Zugriff
- Notion Token: nur Zugriff auf AEO Leads DB
- Jina.ai: nur Reader API

### 8. Error Handling
- Keine Stack Traces an User zurückgeben
- Generische Fehlermeldungen im Frontend
- Detailliertes Logging nur server-side

### 9. Content Security
- Keine User-generierten Inhalte ohne Sanitisierung anzeigen
- Scraped Content als Text behandeln, nicht als HTML
- JSON-LD Output validieren bevor er ausgegeben wird

## Pre-Deploy Checkliste

```bash
# 1. Keine API Keys im Code
grep -r "sk-ant\|jina_\|ntn_" src/ app/ lib/ components/
# → Muss leer sein

# 2. .env.local nicht in Git
git status | grep ".env"
# → .env.local darf NICHT gelistet sein

# 3. .gitignore korrekt
cat .gitignore | grep "env"
# → .env*.local muss enthalten sein
```
