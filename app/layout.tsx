import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import BackToTop from "@/components/back-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Pacific Global Health - Health Systems Improvement | Global Healthcare Training & Research",
    template: "%s | Pacific Global Health"
  },
  description:
    "Pacific Global Health is a leading healthcare organization building comprehensive health system improvement knowledge base and serving as a global think tank for innovative, sustainable solutions in healthcare across the Asia-Pacific region. We offer medical training, internships, scholarships, and research programs.",
  keywords: [
    "global health",
    "healthcare training",
    "medical education",
    "health systems",
    "Asia-Pacific healthcare",
    "medical internships",
    "healthcare scholarships",
    "public health research",
    "primary care",
    "healthcare partnerships",
    "medical electives",
    "health workforce development",
    "global health think tank",
    "healthcare capacity building",
    "medical research",
    "health policy",
    "community medicine",
    "health economics",
    "pacific global health"
  ],
  authors: [{ name: "Dr. Sathira Kasun Perera", url: "https://pacificglobalhealth.org/leadership" }],
  creator: "Pacific Global Health",
  publisher: "Pacific Global Health",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pacificglobalhealth.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pacific Global Health - Health Systems Improvement | Global Healthcare Training & Research",
    description: "Leading healthcare organization building comprehensive health system improvement knowledge base and serving as a global think tank for innovative, sustainable solutions in healthcare across the Asia-Pacific region.",
    url: 'https://pacificglobalhealth.org',
    siteName: 'Pacific Global Health',
    images: [
      {
        url: '/images/pacific-global-health-logo.png',
        width: 1200,
        height: 630,
        alt: 'Pacific Global Health - Health Systems Improvement',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pacific Global Health - Health Systems Improvement",
    description: "Leading healthcare organization building comprehensive health system improvement knowledge base and serving as a global think tank for innovative, sustainable solutions in healthcare across the Asia-Pacific region.",
    images: ['/images/pacific-global-health-logo.png'],
    creator: '@pacificglobalhealth',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual Google Search Console verification code
  },
  category: 'healthcare',
  classification: 'Health & Medical',
  referrer: 'origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pacific Global Health" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>{children}</Suspense>
          <BackToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
