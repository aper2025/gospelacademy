import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://thegospelacademy.com'

export const metadata: Metadata = {
  title: {
    default: 'The Gospel Academy — Christian Online School Powered by AI',
    template: '%s | The Gospel Academy',
  },
  description:
    'Christ-centered online school for Pre-K through Grade 12. AI-powered tutoring, three flexible learning pathways, and a biblical worldview woven into every subject. Starting at $41/month.',
  metadataBase: new URL(SITE_URL),
  keywords: [
    'Christian online school',
    'homeschool curriculum',
    'AI tutoring',
    'biblical worldview education',
    'online learning Pre-K through 12',
    'Christian education',
    'Gospel Academy',
    'faith-based education',
    'Socratic learning',
    'affordable Christian school',
  ],
  authors: [{ name: 'The Gospel Academy' }],
  creator: 'Veritas AI Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'The Gospel Academy',
    title: 'The Gospel Academy — Christian Online School Powered by AI',
    description:
      'Christ-centered online education for Pre-K through Grade 12 with AI-powered tutoring, three learning pathways, and biblical worldview integration.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Gospel Academy — Christian Online School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Gospel Academy — Christian Online School Powered by AI',
    description:
      'Christ-centered online education for Pre-K through Grade 12. AI tutoring, flexible pathways, starting at $41/month.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'The Gospel Academy',
    url: SITE_URL,
    description: 'Christ-centered online school for Pre-K through Grade 12 with AI-powered tutoring.',
    foundingDate: '2026',
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hagerstown',
      addressRegion: 'MD',
      addressCountry: 'US',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '41',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      description: 'Single student monthly plan',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
