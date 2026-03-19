'use client'
import { useState } from 'react'

interface Props {
  score: number
  resultUrl: string
}

export default function ShareButton({ score, resultUrl }: Props) {
  const [copied, setCopied] = useState(false)

  const shareText = `Ich hab gerade gecheckt wie sichtbar mein Betrieb für ChatGPT & Co ist: ${score}/100. Empfiehlt ChatGPT & Co dich überhaupt weiter? Kostenlos testen: ${resultUrl}`

  function handleWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
  }

  function handleCopy() {
    navigator.clipboard.writeText(resultUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <button
        onClick={handleWhatsApp}
        className="h-11 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#25D366' }}
      >
        Via WhatsApp teilen
      </button>
      <button
        onClick={handleCopy}
        className="h-11 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#6366f1' }}
      >
        {copied ? 'Kopiert!' : 'Link kopieren'}
      </button>
    </div>
  )
}
