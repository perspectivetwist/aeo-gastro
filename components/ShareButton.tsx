'use client'
import { useState } from 'react'

interface Props {
  score: number
  url: string
}

export default function ShareButton({ score, url }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const domain = new URL(url).hostname
    const emoji = score >= 70 ? '\ud83d\udfe2' : score >= 40 ? '\ud83d\udfe1' : '\ud83d\udd34'
    const text = `${emoji} Mein AEO-Score: ${score}/100\n\nWebsite: ${domain}\n\nWie sichtbar ist deine Seite f\u00fcr ChatGPT & Co.?\n\ud83d\udc49 Kostenlos testen: https://aeo-transformer.vercel.app`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full h-11 border border-white/10 text-gray-400 font-light rounded-xl hover:bg-white/5 transition-colors text-sm"
    >
      {copied ? '\u2713 Kopiert!' : '\ud83d\udce4 Score teilen'}
    </button>
  )
}
