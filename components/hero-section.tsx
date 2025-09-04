"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Building Healthier Futures Through Global Collaboration"
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener?.("change", handler)

    let interval: ReturnType<typeof setInterval> | undefined
    if (!mq.matches) {
      interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else if (interval) {
          clearInterval(interval)
        }
      }, 200)
    } else {
      setDisplayedText(fullText)
    }

    return () => {
      if (interval) clearInterval(interval)
      mq.removeEventListener?.("change", handler)
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 perspective-1000">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 text-white order-2 lg:order-1 transform-gpu preserve-3d">
            <div className={`space-y-8 ${prefersReducedMotion ? "" : "animate-in fade-in slide-in-from-bottom duration-1000"} transform-gpu preserve-3d hover:translate-z-4 transition-all duration-700`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight transform-gpu preserve-3d hover:rotate-x-2 hover:translate-z-8 transition-all duration-700">
                <span className="relative inline-block transform-gpu preserve-3d hover:scale-105 hover:rotate-y-2 transition-all duration-500">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className={`text-lg md:text-xl text-white/90 text-pretty leading-relaxed ${prefersReducedMotion ? "" : "animate-in fade-in slide-in-from-bottom duration-1000 delay-1000"} transform-gpu preserve-3d hover:translate-z-4 hover:rotate-x-1 transition-all duration-500`}>
                Pacific Global Health serves as a comprehensive health system improvement knowledge base and global
                think tank for innovative, sustainable healthcare solutions across the Asia-Pacific region and beyond.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${prefersReducedMotion ? "" : "animate-in fade-in slide-in-from-bottom duration-1000 delay-1500"} transform-gpu preserve-3d`}>
                <Link href="#services">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg group transition-all duration-500 transform-gpu preserve-3d hover:scale-105 hover:translate-z-6 hover:rotate-x-2 hover:shadow-2xl"
                  >
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:translate-z-2 transition-all duration-300 transform-gpu" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="flex-shrink-0 order-1 lg:order-2 w-full lg:w-1/2 transform-gpu preserve-3d">
            <div className={`relative aspect-video sm:aspect-[4/3] bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 ${prefersReducedMotion ? "" : "animate-in fade-in slide-in-from-right duration-1000 delay-500"} max-w-2xl lg:max-w-md mx-auto transform-gpu preserve-3d ${prefersReducedMotion ? "" : "hover:rotate-y-6 hover:rotate-x-3 hover:scale-105 hover:translate-z-8"} transition-all duration-700 hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl transform translate-z-[-20px] opacity-50 blur-sm"></div>

              {prefersReducedMotion ? (
                <div className="w-full h-full bg-black/10 flex items-center justify-center text-white/70 text-sm">Video preview disabled</div>
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain relative z-10 transform-gpu preserve-3d hover:scale-110 transition-all duration-500"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hailuo_Video_make%20the%20globe%20roate%20around%20it_416252760809857026-g6w9tLDzBNthLYf6YfOwDexpJKyg0H.mp4" type="video/mp4" />
                </video>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 transform-gpu preserve-3d hover:translate-z-2 transition-all duration-300" />

              {!prefersReducedMotion && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-1 transform-gpu"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-float-2 transform-gpu"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-float-3 transform-gpu"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}