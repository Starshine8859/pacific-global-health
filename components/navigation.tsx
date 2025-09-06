"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogIn } from "lucide-react"
import { useEffect } from "react"
import { LoginModal } from "@/components/login-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    // { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/primary-care", label: "PRIMARY CARE" },
    { href: "/partnerships", label: "PARTNERSHIPS" },
    // { href: "/systems-development", label: "SYSTEM DEVELOPMENT" },
    { href: "/training", label: "TRAINING" },
    { href: "/research", label: "RESEARCH" },
    { href: "/leadership", label: "LEADERSHIP" },
    { href: "/contact", label: "CONTACT US" }
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Lock body scroll when mobile menu is open and close on route change
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    // Close menu when the route changes
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm animate-in slide-in-from-top duration-500" role="navigation" aria-label="Main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/pacific-global-health-logo.png"
              alt="Pacific Global Health"
              width={60}
              height={60}
              className="rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-bold text-2xl text-gray-900 transition-colors duration-300 group-hover:text-primary">
              Pacific Global Health
            </span>
          </Link>

           {/* Desktop Navigation */}
           <div className="hidden lg:flex items-center space-x-6">
             {navItems.map((item, index) => (
               <Link
                 key={item.href}
                 href={item.href}
                 className={`relative text-sm font-medium transition-all duration-300 uppercase tracking-wide transform hover:scale-105 animate-in fade-in slide-in-from-top ${
                   isActive(item.href) ? "text-primary" : "text-gray-700 hover:text-primary"
                 }`}
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {item.label}
                 <span
                   className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                     isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                   }`}
                 />
               </Link>
             ))}
             <Button
               variant="outline"
               size="sm"
               onClick={() => setIsLoginModalOpen(true)}
               className="ml-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
             >
               <LogIn className="h-4 w-4 mr-2" />
               Login
             </Button>
           </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-transform duration-200 hover:scale-110"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden animate-in slide-in-from-top duration-300" role="dialog" aria-modal="true">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200 max-h-[calc(100dvh-64px)] overflow-auto">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide rounded-md animate-in fade-in slide-in-from-left ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsOpen(false)
                  }}
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  )
}
