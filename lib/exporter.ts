import { ScanResult } from '@/types/aeo'

export function generateExportText(result: ScanResult): string {
  const { url, scannedAt, score, transformer } = result
  const date = new Date(scannedAt).toLocaleDateString('de-DE')

  return `AEO TRANSFORMER EXPORT
Erstellt: ${date}
Website: ${url}
AEO-Score: ${score.total}/100
==================================================

ANSWER BLOCK
------------
${transformer.answerBlock}

FAQ-STRUKTUR
------------
${transformer.faqItems.map((f, i) => `${i + 1}. ${f.question}\n   ${f.answer}`).join('\n\n')}

META TITLE (${transformer.metaTitle.length} Zeichen)
----------
${transformer.metaTitle}

META DESCRIPTION (${transformer.metaDescription.length} Zeichen)
----------------
${transformer.metaDescription}

JSON-LD SCHEMA
--------------
<script type="application/ld+json">
${JSON.stringify(transformer.jsonLd, null, 2)}
</script>

==================================================
Generiert mit AEO Transformer · https://aeo-transformer.vercel.app
`
}

export function downloadAsText(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
