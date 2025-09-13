"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogIn, LogOut, Sun, Moon } from "lucide-react"
import { useEffect } from "react"
import { LoginModal } from "@/components/login-modal"
import { useTheme } from "next-themes"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

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

  useEffect(() => {
    const readAuth = () => {
      try {
        const raw = localStorage.getItem("pg_auth")
        const parsed = raw ? JSON.parse(raw) : null
        const user = parsed?.user
        setIsAuthenticated(!!user)
        setUserEmail(user?.email ?? null)
        setUserName(user?.name ?? null)
      } catch {
        setIsAuthenticated(false)
        setUserEmail(null)
        setUserName(null)
      }
    }
    readAuth()
    const handle = () => readAuth()
    window.addEventListener("pg-auth-changed", handle as EventListener)
    window.addEventListener("storage", handle)
    return () => {
      window.removeEventListener("pg-auth-changed", handle as EventListener)
      window.removeEventListener("storage", handle)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("pg_auth")
      window.dispatchEvent(new CustomEvent("pg-auth-changed"))
    } catch { }
    setIsAuthenticated(false)
  }

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm dark:shadow-gray-800/50 animate-in slide-in-from-top duration-500" role="navigation" aria-label="Main">
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
            <span className="font-bold text-2xl text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
              Pacific Global Health
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 uppercase tracking-wide transform hover:scale-105 animate-in fade-in slide-in-from-top ${isActive(item.href) ? "text-primary" : "text-gray-700 dark:text-gray-300 hover:text-primary"
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href="/admin"
                className={`relative text-sm font-medium transition-all duration-300 uppercase tracking-wide transform hover:scale-105 animate-in fade-in slide-in-from-top ${isActive('/admin') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                  }`}
              >
                ADMIN
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive('/admin') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                />
              </Link>
            )}
            <div className="flex items-center gap-3 ml-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Login/Logout Button */}
              {!isAuthenticated ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm text-white hover:bg-primary shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Login"
                >
                  <LogIn className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/90 backdrop-blur-sm text-white hover:bg-red-500 shadow-lg transition-all duration-300 hover:scale-105"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button - Always black icons */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-black bg-white/20 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden animate-in slide-in-from-top duration-300" role="dialog" aria-modal="true">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 max-h-[calc(100dvh-64px)] overflow-auto">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide rounded-md animate-in fade-in slide-in-from-left ${isActive(item.href)
                      ? "text-primary bg-primary/10 dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/admin"
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide rounded-md ${isActive('/admin')
                      ? 'text-primary bg-primary/10 dark:bg-primary/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  ADMIN
                </Link>
              )}

              {/* Mobile Theme Toggle and Login/Logout */}
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="flex flex-col gap-2">
                  {/* Theme Toggle Button with Label */}
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all duration-300 text-sm font-medium uppercase tracking-wide"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" />
                        LIGHT MODE
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        DARK MODE
                      </>
                    )}
                  </button>

                  {/* Login/Logout Button with Label */}
                  {!isAuthenticated ? (
                    <button
                      onClick={() => {
                        setIsLoginModalOpen(true)
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-primary/90 backdrop-blur-sm text-white hover:bg-primary shadow-sm transition-all duration-300 text-sm font-medium uppercase tracking-wide"
                      aria-label="Login"
                    >
                      <LogIn className="h-4 w-4" />
                      LOGIN
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-red-500/90 backdrop-blur-sm text-white hover:bg-red-500 shadow-sm transition-all duration-300 text-sm font-medium uppercase tracking-wide"
                      aria-label="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                      LOGOUT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsAuthenticated(true)}
      />
    </nav>
  )
}