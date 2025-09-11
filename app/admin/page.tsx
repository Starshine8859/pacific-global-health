"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StatsResponse {
  totals: { users: number; usersTodayLogins: number; todayContacts: number; todayTrainings: number }
  currentLogin: { email: string; timestamp: string } | null
  daily: { date: string; contacts: number; trainings: number }[]
  activities: { type: string; title: string; time: string }[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/stats', { cache: 'no-store' })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load stats')
        setStats(data)
      } catch (e: any) {
        setError(e.message || 'Failed to load stats')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between cursor-default select-none">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Quick overview of recent activity and key metrics.</p>
        </div>
        <Button className="px-4">Create Report</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-default select-none">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Users (Today Logins)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats?.totals.usersTodayLogins ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">Successful logins today</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Contact Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats?.totals.todayContacts ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">New Training Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats?.totals.todayTrainings ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Current Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-foreground">{stats?.currentLogin?.email ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats?.currentLogin?.timestamp ? new Date(stats.currentLogin.timestamp).toLocaleString() : 'No recent login'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Daily Contacts vs Trainings</CardTitle>
          </CardHeader>
          <CardContent>
            {!stats ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[560px] grid grid-cols-[120px_repeat(14,1fr)] gap-2 text-xs">
                  <div className="text-muted-foreground">Date</div>
                  {stats.daily.map(d => (
                    <div key={d.date} className="text-center text-muted-foreground">{d.date.slice(5)}</div>
                  ))}
                  <div className="font-medium text-foreground">Contacts</div>
                  {stats.daily.map(d => (
                    <div key={d.date+"c"}>
                      <div className="h-16 bg-primary/10 relative">
                        <div className="absolute bottom-0 left-0 right-0 bg-primary" style={{ height: `${Math.min(100, d.contacts * 10)}%` }} />
                      </div>
                      <div className="text-center mt-1">{d.contacts}</div>
                    </div>
                  ))}
                  <div className="font-medium text-foreground">Trainings</div>
                  {stats.daily.map(d => (
                    <div key={d.date+"t"}>
                      <div className="h-16 bg-emerald-500/10 relative">
                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-500" style={{ height: `${Math.min(100, d.trainings * 10)}%` }} />
                      </div>
                      <div className="text-center mt-1">{d.trainings}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {!stats ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : (
              <ul className="space-y-3 text-sm text-muted-foreground">
                {stats.activities.map((a, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{a.title}</span>
                    <span className="text-xs">{new Date(a.time).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


