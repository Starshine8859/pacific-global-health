"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, LayoutDashboard, Users as UsersIcon, Mail, GraduationCap, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AuthProvider } from "@/components/auth-context"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Guard: allow any logged-in user; redirect if not authenticated
    try {
      const raw = localStorage.getItem("pg_auth")
      const parsed = raw ? JSON.parse(raw) : null
      const role = parsed?.user?.role
      const email = parsed?.user?.email
      const name = parsed?.user?.username || parsed?.user?.name
      if (!role) {
        router.replace("/")
        return
      }
      setUserEmail(email ?? null)
      setUserRole(role ?? null)
      setUserName(name ?? null)
    } catch {
      router.replace("/")
    }
  }, [router])

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    try {
      localStorage.removeItem("pg_auth")
      window.dispatchEvent(new CustomEvent("pg-auth-changed"))
    } catch {}
    router.replace("/")
  }

  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [unopenedCounts, setUnopenedCounts] = useState<{ contacts: number; trainings: number } | null>(null)

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const res = await fetch('/api/admin/stats', { cache: 'no-store' })
        const data = await res.json()
        if (res.ok) {
          setUnopenedCounts({ contacts: data?.totals?.todayContacts ?? 0, trainings: data?.totals?.todayTrainings ?? 0 })
        }
      } catch {}
    }
    loadBadges()
    const handler = () => loadBadges()
    window.addEventListener('pg-admin-refresh-badges', handler as EventListener)
    return () => {
      window.removeEventListener('pg-admin-refresh-badges', handler as EventListener)
    }
  }, [])

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col bg-background">
      <header className="h-16 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/pacific-global-health-logo.png"
              alt="Pacific Global Health"
              width={28}
              height={28}
              className="rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Pacific Global Health</span>
          </Link>
          {/* Simple tabs to switch between Admin and User areas */}
          <div className="flex items-center gap-1 border border-border rounded-md p-1 bg-card">
            <span className="px-3 py-1 text-sm rounded [background:var(--primary)/0.1] text-primary">Admin</span>
            <Link href="/" className="px-3 py-1 text-sm rounded hover:bg-accent/20 text-foreground">User</Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground text-right">
              <div className="font-medium text-foreground leading-tight line-clamp-1">{userName ?? userEmail ?? "User"}</div>
              <div className="leading-tight line-clamp-1">{userEmail}</div>
            </div>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-foreground hover:bg-accent/20 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="text-xs">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-accent/20 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-[240px_1fr]">
        <aside className="border-r border-border bg-card p-4 space-y-4 overflow-auto" style={{ height: "calc(100vh - 64px - 80px)" }}>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{userName ?? "Admin"}</h2>
            <p className="text-xs text-muted-foreground mt-1">{userEmail ?? ""}</p>
            <p className="text-xs text-muted-foreground/80">{userRole ?? ""}</p>
          </div>
          <nav className="flex flex-col gap-1">
            <Link href="/admin" className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors ${isActive("/admin") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/users" className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors ${isActive("/admin/users") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              <UsersIcon className="h-4 w-4" />
              <span>Users</span>
            </Link>
            <Link href="/admin/contact" className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors ${isActive("/admin/contact") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              <Mail className="h-4 w-4" />
              <span>Contact</span>
              {unopenedCounts && unopenedCounts.contacts > 0 && (
                <Badge variant="destructive">{unopenedCounts.contacts}</Badge>
              )}
            </Link>
            <Link href="/admin/training" className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors ${isActive("/admin/training") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              <GraduationCap className="h-4 w-4" />
              <span>Training</span>
              {unopenedCounts && unopenedCounts.trainings > 0 && (
                <Badge variant="destructive">{unopenedCounts.trainings}</Badge>
              )}
            </Link>
            <Link href="/admin/login-logs" className={`flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors ${isActive("/admin/login-logs") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              <Shield className="h-4 w-4" />
              <span>Login Logs</span>
            </Link>
          </nav>
        </aside>
        <main className="p-6 overflow-auto" style={{ height: "calc(100vh - 64px - 80px)" }}>
          {children}
        </main>
      </div>
      <footer className="h-20 border-t border-border flex items-center justify-between px-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Pacific Global Health</span>
        <span>Admin Panel</span>
      </footer>
    </div>
    </AuthProvider>
  )
}


