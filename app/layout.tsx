import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import BackToTop from "@/components/back-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pacific Global Health - Health Systems Improvement",
  description:
    "Building comprehensive health system improvement knowledge base and serving as a global think tank for innovative, sustainable solutions in healthcare across the Asia-Pacific region.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
