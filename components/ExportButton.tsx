'use client'
import { ScanResult } from '@/types/aeo'
import { generateExportText, downloadAsText } from '@/lib/exporter'

interface Props { result: ScanResult }

export default function ExportButton({ result }: Props) {
  function handleExport() {
    const domain = new URL(result.url).hostname.replace(/\./g, '-')
    const content = generateExportText(result)
    downloadAsText(content, `aeo-export-${domain}.txt`)
  }

  return (
    <button
      onClick={handleExport}
      className="w-full h-11 border border-white/10 text-gray-400 font-light rounded-xl hover:bg-white/5 transition-colors text-sm"
    >
      \u2b07 AEO-Output exportieren (.txt)
    </button>
  )
}
