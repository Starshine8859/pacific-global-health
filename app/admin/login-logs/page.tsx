"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, Calendar, Mail, CheckCircle, XCircle, Clock } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface LoginLog {
  _id: string
  email: string
  success: boolean
  reason: string
  timestamp: string
  ipAddress: string
  userAgent: string
}

export default function AdminLoginLogsPage() {
  const [logs, setLogs] = useState<LoginLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState<LoginLog | null>(null)
  const [searchEmail, setSearchEmail] = useState('')
  const [filterSuccess, setFilterSuccess] = useState<'all' | 'success' | 'failed'>('all')
  const { user: currentUser } = useAuth()

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (isAdmin) {
      fetchLogs(page)
    }
  }, [page, searchEmail, filterSuccess, isAdmin])

  const fetchLogs = async (pageParam = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString()
      })
      
      if (searchEmail) params.append('email', searchEmail)
      if (filterSuccess !== 'all') params.append('success', filterSuccess === 'success' ? 'true' : 'false')
      
      const response = await fetch(`/api/login-logs?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setLogs(data.logs || [])
        setTotalPages(data.totalPages || 1)
      } else {
        setError(data.message || 'Failed to fetch login logs')
      }
    } catch (err) {
      setError('Network error fetching login logs')
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
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const openDetails = (log: LoginLog) => {
    setSelected(log)
  }

  const clearFilters = () => {
    setSearchEmail('')
    setFilterSuccess('all')
    setPage(1)
  }

  // If user is not admin, show read-only view
  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Login Logs</h1>
          <p className="text-muted-foreground mt-2">Read-only access - Admin role required for management</p>
        </div>
        
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">You need admin privileges to view login logs</p>
          </CardContent>
        </Card>
      </div>
    )
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
        <Button onClick={() => fetchLogs(page)} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Login Logs</h1>
        <p className="text-muted-foreground mt-2">Monitor user login attempts and security events</p>
        
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <Input 
              placeholder="Search by email..." 
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-64"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <select 
              value={filterSuccess} 
              onChange={(e) => setFilterSuccess(e.target.value as 'all' | 'success' | 'failed')}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No login logs found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Reason</th>
                <th className="px-4 py-3 text-left">Timestamp</th>
                <th className="px-4 py-3 text-left">IP Address</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {log.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={log.success ? 'default' : 'destructive'}>
                      <div className="flex items-center gap-1">
                        {log.success ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {log.success ? 'Success' : 'Failed'}
                      </div>
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{log.reason}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(log.timestamp)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{log.ipAddress}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline" onClick={() => openDetails(log)}>
                      View Details
                    </Button>
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

      {/* Login Log Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Login Attempt Details</h3>
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
              {/* Login Info */}
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
                    {selected.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-medium">Status</span>
                  </div>
                  <div className="ml-6">
                    <Badge variant={selected.success ? 'default' : 'destructive'}>
                      {selected.success ? 'Success' : 'Failed'}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Timestamp</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{formatDate(selected.timestamp)}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="font-medium">IP Address</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.ipAddress}</p>
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  Reason
                </h4>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-foreground">{selected.reason}</p>
                </div>
              </div>

              {/* User Agent */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  User Agent
                </h4>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-foreground break-all">{selected.userAgent}</p>
                </div>
              </div>
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
