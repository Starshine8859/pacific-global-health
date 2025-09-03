"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Building Healthier Futures Through Global Collaboration"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 text-white order-2 lg:order-1">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                <span className="relative">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
                Pacific Global Health serves as a comprehensive health system improvement knowledge base and global
                think tank for innovative, sustainable healthcare solutions across the Asia-Pacific region and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-1500">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Learn About Our Mission
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-1/2">
            <div className="relative aspect-square bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-right duration-1000 delay-500 max-w-md mx-auto">
              <video autoPlay loop muted playsInline className="w-full h-full object-contain">
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hailuo_Video_make%20the%20globe%20roate%20around%20it_416252760809857026-g6w9tLDzBNthLYf6YfOwDexpJKyg0H.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
