"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth data on mount
    const storedAuth = localStorage.getItem('pg_auth')
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        if (authData.user) {
          setToken('dummy-token') // For compatibility with existing code
          setUser(authData.user)
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error)
        localStorage.removeItem('pg_auth')
      }
    } else if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('pg_auth', JSON.stringify({ user: newUser }))
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('pg_auth')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

