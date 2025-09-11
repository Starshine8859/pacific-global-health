"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, Mail, Phone, MessageSquare } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface TrainingApplication {
  _id: string
  name: string
  email: string
  phone: string
  program: 'internship' | 'elective' | 'training' | 'scholarship'
  inquiry: string
  status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'completed'
  createdAt: string
  updatedAt: string
  opened?: boolean
  openedAt?: string
  openedBy?: { id: string; username?: string | null; email?: string | null }
}

export default function AdminTrainingPage() {
  const [applications, setApplications] = useState<TrainingApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState<TrainingApplication | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'all' | 'new' | 'old'>('all')
  const { user } = useAuth()

  useEffect(() => {
    fetchApplications(page)
  }, [page, viewMode])

  const fetchApplications = async (pageParam = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trainings?page=${pageParam}&limit=${limit}`)
      const data = await response.json()
      
      if (response.ok) {
        let filteredApplications = data.applications || []
        
        // Apply view mode filter
        if (viewMode === 'new') {
          filteredApplications = filteredApplications.filter((a: TrainingApplication) => a.openedAt === null)
        } else if (viewMode === 'old') {
          filteredApplications = filteredApplications.filter((a: TrainingApplication) => a.openedAt !== null)
        }
        
        setApplications(filteredApplications)
        setTotalPages(data.totalPages || 1)
      } else {
        setError(data.message || 'Failed to fetch applications')
      }
    } catch (err) {
      setError('Network error fetching applications')
    } finally {
      setLoading(false)
    }
  }

  const getProgramLabel = (program: string) => {
    switch (program) {
      case 'internship': return 'Internship'
      case 'elective': return 'Elective'
      case 'training': return 'Training Program'
      case 'scholarship': return 'Scholarship'
      default: return program
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleSelectAll = () => {
    if (applications.every(a => selectedIds.includes(a._id))) {
      setSelectedIds([])
    } else {
      setSelectedIds(applications.map(a => a._id))
    }
  }

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const markOpened = async () => {
    if (selectedIds.length === 0 || !user) return
    try {
      const res = await fetch('/api/trainings/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, user: { id: user.id, username: user.username, email: user.email } })
      })
      if (res.ok) {
        setSelectedIds([])
        fetchApplications(page)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const markSelected = async () => {
    if (selectedIds.length === 0 || !user) return
    try {
      const res = await fetch('/api/trainings/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, user: { id: user.id, username: user.username, email: user.email } })
      })
      if (res.ok) {
        setSelectedIds([])
        fetchApplications(page)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const openDetails = async (record: TrainingApplication) => {
    try {
      const response = await fetch(`/api/trainings/${record._id}`)
      const data = await response.json()
      
      if (response.ok) {
        const updatedRecord = data.application
        setApplications(prev => prev.map(a => a._id === record._id ? updatedRecord : a))
        setSelected(updatedRecord)
        try { window.dispatchEvent(new CustomEvent('pg-admin-refresh-badges')) } catch {}
      } else {
        setSelected(record)
      }
    } catch (e) {
      console.error(e)
      setSelected(record)
    }
  }

  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <Button onClick={() => fetchApplications(page)} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Training Applications</h1>
        <p className="text-muted-foreground mt-2">Read-only list with pagination</p>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">View Mode:</label>
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value as 'all' | 'new' | 'old')}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="new">New (openedAt is null)</option>
              <option value="old">Old (openedAt is not null)</option>
            </select>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No training applications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" aria-label="Select all" checked={applications.length > 0 && applications.every(a => selectedIds.includes(a._id))} onChange={toggleSelectAll} />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled={selectedIds.length === 0 || !user} onClick={markOpened}>Mark Opened</Button>
              <Button size="sm" variant="default" disabled={selectedIds.length === 0 || !user} onClick={markSelected}>Mark</Button>
            </div>
          </div>
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <input type="checkbox" aria-label="Select all" checked={applications.length > 0 && applications.every(a => selectedIds.includes(a._id))} onChange={toggleSelectAll} />
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Program</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Opened</th>
                <th className="px-4 py-3 text-left">Opened By</th>
                <th className="px-4 py-3 text-left">Opened At</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a._id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <input type="checkbox" aria-label="Select row" checked={selectedIds.includes(a._id)} onChange={() => toggleOne(a._id)} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{a.name}</td>
                  <td className="px-4 py-3"><div className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{a.email}</div></td>
                  <td className="px-4 py-3"><div className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{a.phone}</div></td>
                  <td className="px-4 py-3">{getProgramLabel(a.program)}</td>
                  <td className="px-4 py-3"><div className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(a.createdAt)}</div></td>
                  <td className="px-4 py-3">{a.opened ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">{a.openedBy?.username || a.openedBy?.email || '—'}</td>
                  <td className="px-4 py-3">{a.openedAt ? formatDate(a.openedAt) : '—'}</td>
                  <td className="px-4 py-3"><Button size="sm" variant="outline" onClick={() => openDetails(a)}>Details</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelected(null)}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
              {/* Application Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Created</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{formatDate(selected.createdAt)}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-purple-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    <span className="font-medium">Program</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{getProgramLabel(selected.program)}</p>
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  Application Details
                </h4>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selected.inquiry}</p>
                </div>
              </div>

              {/* Opened Info */}
              {selected.opened && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-500"></div>
                    View History
                  </h4>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800">
                    <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">Viewed by {selected.openedBy?.username || selected.openedBy?.email || 'Unknown'}</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 ml-4">
                      {selected.openedAt ? formatDate(selected.openedAt) : 'Unknown time'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/30">
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}