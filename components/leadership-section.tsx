"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function LeadershipSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "animate-in fade-in slide-in-from-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-balance leading-tight">
              Become a<span className="text-primary animate-pulse"> regular partner</span> and strengthen health systems
              today
            </h2>

            <p className="text-xl text-gray-300 text-pretty leading-relaxed">
              Your regular partnership can help to make sure the world's most vulnerable healthcare systems have access
              to quality care, won't go without essential services or miss out on life-saving interventions.
            </p>

            {/* <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                PARTNER NOW
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </div> */}
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "animate-in fade-in slide-in-from-right" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/partnership.png"
                alt="Healthcare partnership"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
