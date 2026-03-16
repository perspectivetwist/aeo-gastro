'use client'

import { useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'

// Shared scan count across all UrlInputForm instances
let sharedScans = Math.floor(Math.random() * 8) + 2
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  setInterval(() => {
    sharedScans = Math.floor(Math.random() * 8) + 2
    listeners.forEach((l) => l())
  }, 60000)
}

function useActiveScans() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => sharedScans,
    () => sharedScans,
  )
}

function MrtScanner() {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-7 sm:h-7 flex flex-col justify-center gap-[2px] sm:gap-[3px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[2px] bg-blue-400 rounded-full animate-mrt-slice"
          style={{
            animationDelay: `${i * 0.15}s`,
            boxShadow: '0 0 6px rgba(96,165,250,0.9)',
          }}
        />
      ))}
    </div>
  )
}

export default function UrlInputForm() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const activeScans = useActiveScans()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = url.trim()
    if (!trimmed) {
      setError('Bitte URL eingeben')
      return
    }

    if (trimmed.length > 500) {
      setError('URL zu lang (max 500 Zeichen)')
      return
    }

    router.push(`/scanning?url=${encodeURIComponent(trimmed)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://deine-website.de"
            className="w-full h-11 px-4 pr-12 rounded-lg border border-white/15 bg-white/5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 backdrop-blur-sm"
          />
          <MrtScanner />
          <p className="hidden sm:block absolute -bottom-5 right-0 text-blue-300 text-xs font-light">
            Gerade aktiv: {activeScans} Scans
          </p>
        </div>
        <button
          type="submit"
          className="relative h-11 px-4 sm:px-8 rounded-xl font-semibold text-sm transition-all overflow-hidden backdrop-blur-sm cta-glass shrink-0"
        >
          <span className="relative z-10 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Jetzt pr&uuml;fen
          </span>
        </button>
      </div>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </form>
  )
}
