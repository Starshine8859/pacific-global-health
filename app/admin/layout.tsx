"use client"
import type { ReactNode } from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Guard: only allow admin
    try {
      const raw = localStorage.getItem("pg_auth")
      const parsed = raw ? JSON.parse(raw) : null
      const role = parsed?.user?.role
      const email = parsed?.user?.email
      if (role !== "admin") {
        router.replace("/")
        return
      }
      setUserEmail(email ?? null)
      setUserRole(role ?? null)
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

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-gray-200 bg-white p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-xs text-gray-500 mt-1">{userEmail ?? ""}</p>
          <p className="text-xs text-gray-400">{userRole ?? ""}</p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className={`text-sm rounded px-2 py-1 ${isActive("/admin") ? "bg-primary/10 text-primary" : "text-gray-700 hover:text-primary"}`}>Dashboard</Link>
          <Link href="/admin/users" className={`text-sm rounded px-2 py-1 ${isActive("/admin/users") ? "bg-primary/10 text-primary" : "text-gray-700 hover:text-primary"}`}>Users</Link>
          <Link href="/admin/settings" className={`text-sm rounded px-2 py-1 ${isActive("/admin/settings") ? "bg-primary/10 text-primary" : "text-gray-700 hover:text-primary"}`}>Settings</Link>
        </nav>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
      </aside>
      <main className="p-6 bg-gray-50">{children}</main>
    </div>
  )
}


