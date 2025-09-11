"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Building, MessageSquare } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface ContactMessage {
  _id: string
  firstName: string
  lastName: string
  email: string
  organization?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
  opened?: boolean
  openedAt?: string
  openedBy?: { id: string; username?: string | null; email?: string | null }
}

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'all' | 'new' | 'old'>('all')
  const { user } = useAuth()

  useEffect(() => {
    fetchContacts(page)
  }, [page, viewMode])

  const fetchContacts = async (pageParam = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/contact?page=${pageParam}&limit=${limit}`)
      const data = await response.json()
      if (response.ok) {
        let filteredContacts = data.contacts || []
        
        // Apply view mode filter
        if (viewMode === 'new') {
          filteredContacts = filteredContacts.filter((c: ContactMessage) => c.openedAt === null)
        } else if (viewMode === 'old') {
          filteredContacts = filteredContacts.filter((c: ContactMessage) => c.openedAt !== null)
        }
        
        setContacts(filteredContacts)
        setTotalPages(data.totalPages || 1)
      } else {
        setError(data.message || 'Failed to fetch contacts')
      }
    } catch (err) {
      setError('Network error fetching contacts')
    } finally {
      setLoading(false)
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
    if (contacts.every(c => selectedIds.includes(c._id))) {
      setSelectedIds([])
    } else {
      setSelectedIds(contacts.map(c => c._id))
    }
  }

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const markOpened = async () => {
    if (selectedIds.length === 0 || !user) return
    try {
      const res = await fetch('/api/contact/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, user: { id: user.id, username: user.username, email: user.email } })
      })
      if (res.ok) {
        setSelectedIds([])
        fetchContacts(page)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const markSelected = async () => {
    if (selectedIds.length === 0 || !user) return
    try {
      const res = await fetch('/api/contact/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, user: { id: user.id, username: user.username, email: user.email } })
      })
      if (res.ok) {
        setSelectedIds([])
        fetchContacts(page)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const openDetails = async (record: ContactMessage) => {
    try {
      const response = await fetch(`/api/contact/${record._id}`)
      const data = await response.json()
      
      if (response.ok) {
        const updatedRecord = data.contact
        setContacts(prev => prev.map(c => c._id === record._id ? updatedRecord : c))
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
        <Button onClick={() => fetchContacts(page)} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
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

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" aria-label="Select all" checked={contacts.length > 0 && contacts.every(c => selectedIds.includes(c._id))} onChange={toggleSelectAll} />
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
                  <input type="checkbox" aria-label="Select all" checked={contacts.length > 0 && contacts.every(c => selectedIds.includes(c._id))} onChange={toggleSelectAll} />
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Organization</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Opened</th>
                <th className="px-4 py-3 text-left">Opened By</th>
                <th className="px-4 py-3 text-left">Opened At</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <input type="checkbox" aria-label="Select row" checked={selectedIds.includes(c._id)} onChange={() => toggleOne(c._id)} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.firstName} {c.lastName}</td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{c.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {c.organization ? (
                      <div className="inline-flex items-center gap-2"><Building className="h-4 w-4" />{c.organization}</div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[24ch]" title={c.subject}>{c.subject}</td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDate(c.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3">{c.opened ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">{c.openedBy?.username || c.openedBy?.email || '—'}</td>
                  <td className="px-4 py-3">{c.openedAt ? formatDate(c.openedAt) : '—'}</td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline" onClick={() => openDetails(c)}>Details</Button>
                  </td>
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
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selected.firstName} {selected.lastName}</h3>
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
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.email}</p>
                </div>
                
                {selected.organization && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Organization</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{selected.organization}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Created</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{formatDate(selected.createdAt)}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="font-medium">Status</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6 capitalize">{selected.status.replace('_',' ')}</p>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  Subject
                </h4>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-foreground">{selected.subject}</p>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  Message
                </h4>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{selected.message}</p>
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