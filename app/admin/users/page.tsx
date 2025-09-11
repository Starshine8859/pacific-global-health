"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Edit, Trash2, Key, Calendar, Mail, User, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface User {
  _id: string
  username: string
  email: string
  role: 'admin' | 'user'
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState<User | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'all' | 'admin' | 'user'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { user: currentUser } = useAuth()

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin'

  useEffect(() => {
    if (isAdmin) {
      fetchUsers(page)
    }
  }, [page, viewMode, isAdmin])

  const fetchUsers = async (pageParam = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users?page=${pageParam}&limit=${limit}`)
      const data = await response.json()
      if (response.ok) {
        let filteredUsers = data.users || []
        
        // Apply view mode filter
        if (viewMode === 'admin') {
          filteredUsers = filteredUsers.filter((u: User) => u.role === 'admin')
        } else if (viewMode === 'user') {
          filteredUsers = filteredUsers.filter((u: User) => u.role === 'user')
        }
        
        setUsers(filteredUsers)
        setTotalPages(data.totalPages || 1)
      } else {
        setError(data.message || 'Failed to fetch users')
      }
    } catch (err) {
      setError('Network error fetching users')
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
    if (users.every(u => selectedIds.includes(u._id))) {
      setSelectedIds([])
    } else {
      setSelectedIds(users.map(u => u._id))
    }
  }

  const toggleOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const openDetails = async (record: User) => {
    setSelected(record)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const openPasswordModal = (user: User) => {
    setEditingUser(user)
    setShowPasswordModal(true)
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchUsers(page)
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to delete user')
      }
    } catch (e) {
      console.error(e)
      alert('Network error')
    }
  }

  // If user is not admin, show read-only view
  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-2">Read-only access - Admin role required for management</p>
        </div>
        
        <Card>
          <CardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">You need admin privileges to manage users</p>
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
        <Button onClick={() => fetchUsers(page)} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage users with full CRUD operations</p>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">View Mode:</label>
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value as 'all' | 'admin' | 'user')}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All Users</option>
              <option value="admin">Admins Only</option>
              <option value="user">Users Only</option>
            </select>
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No users found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" aria-label="Select all" checked={users.length > 0 && users.every(u => selectedIds.includes(u._id))} onChange={toggleSelectAll} />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default" onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add User
              </Button>
            </div>
          </div>
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left w-10">
                  <input type="checkbox" aria-label="Select all" checked={users.length > 0 && users.every(u => selectedIds.includes(u._id))} onChange={toggleSelectAll} />
                </th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Last Login</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <input type="checkbox" aria-label="Select row" checked={selectedIds.includes(u._id)} onChange={() => toggleOne(u._id)} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {u.username}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {u.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={u.isActive ? 'default' : 'destructive'}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(u.createdAt)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {u.lastLogin ? formatDate(u.lastLogin) : 'Never'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => openDetails(u)}>View</Button>
                      <Button size="sm" variant="outline" onClick={() => openEditModal(u)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => openPasswordModal(u)}>
                        <Key className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteUser(u._id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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

      {/* User Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selected.username}</h3>
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
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Username</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.username}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{selected.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Role</span>
                  </div>
                  <div className="ml-6">
                    <Badge variant={selected.role === 'admin' ? 'default' : 'secondary'}>
                      {selected.role}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="font-medium">Status</span>
                  </div>
                  <div className="ml-6">
                    <Badge variant={selected.isActive ? 'default' : 'destructive'}>
                      {selected.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
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
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last Login</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {selected.lastLogin ? formatDate(selected.lastLogin) : 'Never'}
                  </p>
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

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchUsers(page)
          }}
        />
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <EditUserModal 
          user={editingUser}
          onClose={() => {
            setShowEditModal(false)
            setEditingUser(null)
          }}
          onSuccess={() => {
            setShowEditModal(false)
            setEditingUser(null)
            fetchUsers(page)
          }}
        />
      )}

      {/* Password Update Modal */}
      {showPasswordModal && editingUser && (
        <PasswordUpdateModal 
          user={editingUser}
          onClose={() => {
            setShowPasswordModal(false)
            setEditingUser(null)
          }}
          onSuccess={() => {
            setShowPasswordModal(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}

// Create User Modal Component
function CreateUserModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        alert(data.message || 'Failed to create user')
      }
    } catch (e) {
      console.error(e)
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <h3 className="text-lg font-semibold">Create New User</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit User Modal Component
function EditUserModal({ user, onClose, onSuccess }: { user: User, onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        alert(data.message || 'Failed to update user')
      }
    } catch (e) {
      console.error(e)
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <h3 className="text-lg font-semibold">Edit User</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Password Update Modal Component
function PasswordUpdateModal({ user, onClose, onSuccess }: { user: User, onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/users/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert('Password updated successfully')
        onSuccess()
      } else {
        alert(data.message || 'Failed to update password')
      }
    } catch (e) {
      console.error(e)
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <h3 className="text-lg font-semibold">Update Password</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              minLength={6}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
