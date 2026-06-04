import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type ProtectedRouteProps = {
  children: React.ReactNode
  role?: 'senior' | 'provider' | 'admin'
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" />

  if (role && user?.role !== role) return <Navigate to="/dashboard" />

  return children
}

export default ProtectedRoute
