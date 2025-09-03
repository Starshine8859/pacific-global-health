"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, MapPin } from "lucide-react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const footerSections = [
    {
      title: "Services",
      links: [
        { href: "/primary-care", label: "Primary Care" },
        { href: "/partnerships", label: "Global Partnerships" },
        { href: "/systems-development", label: "Systems Development" },
        { href: "/training", label: "Training & Development" },
        { href: "/research", label: "Research" },
      ],
    },
    {
      title: "Organization",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/leadership", label: "Leadership" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
  ]

  return (
    <footer className="bg-card border-t border-border" ref={footerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div
            className={`md:col-span-2 space-y-4 transition-all duration-1000 ${
              isVisible ? "animate-in fade-in slide-in-from-bottom" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/pacific-global-health-logo.png"
                alt="Pacific Global Health"
                width={40}
                height={40}
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-bold text-lg text-foreground transition-colors duration-300 group-hover:text-primary">
                Pacific Global Health
              </span>
            </Link>
            <p className="text-muted-foreground text-pretty max-w-md">
              Building comprehensive health system improvement knowledge base and serving as a global think tank for
              innovative, sustainable solutions in healthcare.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary animate-pulse" />
              <span>Strengthening health systems across the Asia-Pacific region</span>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div
              key={index}
              className={`space-y-4 transition-all duration-1000 ${
                isVisible ? "animate-in fade-in slide-in-from-bottom" : "opacity-0 translate-y-8"
              }`}
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-1000 delay-500 ${
            isVisible ? "animate-in fade-in slide-in-from-bottom" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground">© 2024 Pacific Global Health. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
              <MapPin className="h-4 w-4" />
              <span>Asia-Pacific Region</span>
            </div>
            <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
