import { BarChart2, Sparkles, MessageSquare, Code2, Tag, Share2, Search, Cpu, FileCheck, Building2, Briefcase, Users, PenTool } from 'lucide-react'
import UrlInputForm from '@/components/UrlInputForm'
import LandingFaq from '@/components/LandingFaq'

const features = [
  { icon: BarChart2, title: 'AEO-Score 0\u2013100', desc: 'Klare Zahl: wie KI-sichtbar du bist' },
  { icon: Sparkles, title: 'Answer Block', desc: 'KI-zitierbarer Absatz, sofort nutzbar' },
  { icon: MessageSquare, title: 'FAQ-Struktur', desc: '5 Nutzerfragen + Antworten' },
  { icon: Code2, title: 'JSON-LD Schema', desc: 'Maschinenlesbares Markup' },
  { icon: Tag, title: 'Meta Tags', desc: 'Title + Description optimiert' },
  { icon: Share2, title: 'Score teilen', desc: 'Link zum Vergleichen' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* Gradient background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
          {/* 5.5: Trust bar */}
          <p className="text-[10px] sm:text-sm font-light text-gray-300 mb-6 tracking-wide uppercase whitespace-nowrap">
            Kostenlos &middot; Kein Account n&ouml;tig &middot; Ergebnis in ~20&nbsp;Sek.
          </p>

          {/* 5.7: Social Proof Bubble */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-12 sm:mb-20">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-base font-light text-gray-300">&Uuml;ber 15.000 Restaurants auf KI-Sichtbarkeit gepr&uuml;ft</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 sm:mb-16 leading-tight">
            Kostenloser KI-Sichtbarkeits-Scan{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              f&uuml;r dein Restaurant
            </span>
          </h1>

          <p className="text-base sm:text-lg font-light text-gray-300 mb-10 max-w-xl mx-auto">
            Pr&uuml;fe in 60 Sekunden, ob ChatGPT, Google AI und Perplexity dein Restaurant empfehlen und was du &auml;ndern kannst.
          </p>

          <UrlInputForm />

        </div>
      </div>

      {/* DEFINITION */}
      <section className="max-w-2xl mx-auto px-4 pt-2 pb-6 text-center">
        <p className="text-sm text-gray-400 leading-relaxed">
          Der AEO Scanner pr&uuml;ft kostenlos ob ChatGPT dein Restaurant lesen und zitieren kann. F&uuml;r Restaurants, Caf&eacute;s und Gastronomiebetriebe in Deutschland.
        </p>
      </section>

      {/* STATS */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
          {[
            { num: '90%', label: 'Websites sind unsichtbar f\u00fcr KI', source: 'Website AI Score', url: 'https://websiteaiscore.com/blog/case-study-1500-websites-ai-readability-audit' },
            { num: '14,2%', label: 'AI Search Conversion vs. 2,8% bei Google', source: 'Superprompt', url: 'https://superprompt.com/blog/ai-search-traffic-conversion-rates-5x-higher-than-google-2025-data' },
            { num: '+357%', label: 'Mehr KI-Suchanfragen in den letzten 6 Monaten', source: 'Similarweb', url: 'https://www.similarweb.com/blog/insights/ai-news/ai-referral-traffic-winners/' },
          ].map(({ num, label, source, url }) => (
            <div
              key={label}
              className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {num}
              </div>
              <div className="text-xs font-light text-gray-300 mt-1">{label}</div>
              <div className="text-[10px] font-light text-gray-500 mt-0.5">Quelle: <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">{source}</a></div>
            </div>
          ))}
        </div>
      </div>

      {/* SO FUNKTIONIERT'S */}
      <div className="max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          So funktioniert&apos;s
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          Drei Schritte zu deinem Restaurant AEO-Report.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Search, step: '1', title: 'URL eingeben', desc: 'Gib deine Website-URL ein. Wir scannen die Seite automatisch.' },
            { icon: Cpu, step: '2', title: 'KI analysiert', desc: 'Unsere KI pr\u00fcft, wie gut dein Content von ChatGPT, Perplexity & Co. zitiert werden kann.' },
            { icon: FileCheck, step: '3', title: 'Report erhalten', desc: 'Du bekommst deinen AEO-Score, optimierten Content und konkrete Handlungsschritte.' },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-purple-400" />
              </div>
              <div className="text-xs text-purple-400 font-medium mb-1">Schritt {step}</div>
              <div className="font-medium text-white text-sm mb-2">{title}</div>
              <div className="text-gray-300 text-xs font-light">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE GRID */}
      <div className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          Was du bekommst
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          Optimierter Content. Sofort einsatzbereit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Icon size={20} className="text-purple-400 mb-3" />
              <div className="font-medium text-white text-sm">{title}</div>
              <div className="text-gray-300 text-xs font-light mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FÜR WEN */}
      <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          F&uuml;r wen ist der AEO Gastro Scanner?
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          Jeder Gastro-Betrieb, der von KI-Antwortmaschinen als Quelle zitiert werden will.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Building2, title: 'Restaurants & Cafés', desc: 'Erfahre in 20 Sekunden, ob ChatGPT dein Restaurant empfiehlt wenn Gäste nach Empfehlungen fragen.' },
            { icon: Briefcase, title: 'Hotels & Catering', desc: 'Prüfe ob dein Betrieb bei KI-gestützten Reise- und Eventplanungen auftaucht.' },
            { icon: PenTool, title: 'Gastro-Berater & Agenturen', desc: 'Zeig deinen Kunden mit einem Score, warum KI-Sichtbarkeit der neue Standard ist.' },
            { icon: Users, title: 'Lieferdienste & Foodtrucks', desc: 'KI-Agenten empfehlen bald Lieferoptionen. Stelle sicher dass du dabei bist.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-5 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Icon size={20} className="text-purple-400 mb-3" />
              <div className="font-medium text-white text-sm mb-1">{title}</div>
              <div className="text-gray-300 text-xs font-light leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 pt-24 sm:pt-44 pb-16 sm:pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          H&auml;ufig gestellte Fragen
        </h2>
        <LandingFaq />
      </div>

      {/* Newsroom Link */}
      <div className="max-w-3xl mx-auto px-4 py-6 text-center border-t border-white/5">
        <a
          href="https://ai-gastro-hub.vercel.app/newsroom"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 transition"
        >
          🍳 KI-Gastro-Newsroom — Was KI f&uuml;r Restaurants bedeutet, jeden Montag neu
        </a>
      </div>

      {/* FOOTER CTA */}
      <div className="border-t border-white/10 py-16 sm:py-32 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Ist dein Restaurant bereit f&uuml;r KI-Suchen?
        </h2>
        <UrlInputForm />
      </div>
    </main>
  )
}
