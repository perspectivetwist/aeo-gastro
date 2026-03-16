import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
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
        <JsonLdSchema />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
