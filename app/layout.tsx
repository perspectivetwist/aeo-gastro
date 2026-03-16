import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer";
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
  robots: { index: false, follow: false },
  title: "AEO Transformer – KI-Sichtbarkeit messen",
  description:
    "Kostenloses Tool das berechnet wie sichtbar deine Website für ChatGPT, Perplexity und Gemini ist. AEO-Score in 20 Sekunden.",
  openGraph: {
    title: "AEO Transformer – Ist deine Website KI-sichtbar?",
    description:
      "AEO-Score kostenlos messen + optimierten Content erhalten.",
    url: "https://aeo-transformer.vercel.app",
    siteName: "AEO Transformer",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AEO Score Checker",
    description: "Kostenloser AEO-Score für deine Website.",
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
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
