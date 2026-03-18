import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: { other: { 'msvalidate.01': '4238BAC83D0A84184DB5C8AEF5C3CE14' } },
  robots: { index: true, follow: true },
  title: "KI-Sichtbarkeit für Gastronomie | Wird ChatGPT dein Restaurant empfehlen?",
  description:
    "Kostenloser AEO-Scan für die Gastronomie: Ist dein Restaurant für ChatGPT, Google AI und Perplexity sichtbar? Ergebnis in 60 Sekunden.",
  openGraph: {
    title: "KI-Sichtbarkeit für Gastronomie | Wird ChatGPT dein Restaurant empfehlen?",
    description:
      "Kostenloser AEO-Scan für die Gastronomie: Ist dein Restaurant für ChatGPT, Google AI und Perplexity sichtbar?",
    url: "https://aeo-gastro.vercel.app",
    siteName: "AEO Gastro Scanner",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "KI-Sichtbarkeit für Gastronomie | AEO Scanner",
    description: "Kostenloser AEO-Scan für die Gastronomie: Ist dein Restaurant für ChatGPT sichtbar?",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <JsonLdSchema />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Shift Drift",
              "url": "https://ai-gastro-hub.vercel.app",
              "sameAs": [
                "https://github.com/perspectivetwist",
                "https://www.crunchbase.com/organization/ai-shift-drift"
              ]
            })
          }}
        />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
