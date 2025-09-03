"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50 p-3 rounded-full
        bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg
        transition-all duration-300 ease-in-out transform
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
        group
      `}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-1" />
    </button>
  )
}
