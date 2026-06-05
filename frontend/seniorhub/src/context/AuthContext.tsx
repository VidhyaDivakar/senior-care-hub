import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import type { User, AuthContextType } from '../types'

export const AuthContext = createContext<AuthContextType | null>(null)

const decodeToken = (token: string): Partial<User> | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return { _id: payload.user?.id, role: payload.user?.role ?? 'senior' }
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  // seed role immediately from JWT so sidebar shows correct links without waiting for auth/me
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('token')
    if (!stored) return null
    const decoded = decodeToken(stored)
    return decoded ? { _id: decoded._id ?? '', username: '', email: '', role: decoded.role ?? 'senior' } : null
  })

  useEffect(() => {
    if (!token) return
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data)).catch(() => logout())
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    const decoded = decodeToken(newToken)
    if (decoded) {
      setUser({ _id: decoded._id ?? '', username: '', email: '', role: decoded.role ?? 'senior' })
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
