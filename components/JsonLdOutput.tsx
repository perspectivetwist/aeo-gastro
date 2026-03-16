'use client'
import { useState } from 'react'

interface Props { jsonLd: string }

export default function JsonLdOutput({ jsonLd }: Props) {
  const [copied, setCopied] = useState(false)

  const formatted = (() => {
    try { return JSON.stringify(JSON.parse(jsonLd), null, 2) }
    catch { return jsonLd }
  })()

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => { navigator.clipboard.writeText(formatted); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className="text-xs text-purple-400 hover:text-purple-300"
        >
          {copied ? '\u2713 Kopiert' : 'Kopieren'}
        </button>
      </div>
      <pre className="bg-black/30 rounded-lg p-4 text-xs overflow-auto max-h-48 text-gray-300">
        {formatted}
      </pre>
    </div>
  )
}
