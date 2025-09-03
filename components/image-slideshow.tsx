"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/healthcare-worker-with-patient-in-asia-pacific-reg.png",
      title: "Primary Care Excellence",
      description: "Delivering accessible healthcare across the Pacific",
    },
    {
      image: "/healthcare-training-in-pacific-islands.png",
      title: "Training & Development",
      description: "Building healthcare capacity through education",
    },
    {
      image: "/children-receiving-healthcare-in-asia-pacific.png",
      title: "Community Health",
      description: "Improving health outcomes for all ages",
    },
    {
      image: "/healthcare-partnership-meeting.png",
      title: "Global Partnerships",
      description: "Collaborating for sustainable health systems",
    },
    {
      image: "/health-systems-research.png",
      title: "Research & Innovation",
      description: "Evidence-based healthcare solutions",
    },
  ]

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(slideInterval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full py-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact Across the Pacific</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Witness the transformative power of global healthcare collaboration through our initiatives
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] bg-black/20 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 animate-in fade-in scale-in duration-1000 delay-500">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100 translate-x-0"
                      : index < currentSlide
                        ? "opacity-0 scale-95 -translate-x-full"
                        : "opacity-0 scale-95 translate-x-full"
                  }`}
                >
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom duration-700">
                        {slide.title}
                      </h3>
                      <p className="text-lg md:text-xl text-white/90 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125 shadow-lg"
                      : "bg-white/50 hover:bg-white/70 hover:scale-110"
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-4000 ease-linear"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
