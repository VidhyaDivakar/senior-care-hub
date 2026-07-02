import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const OAuthCallback = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) {
      navigate('/login')
      return
    }
    login(token)
    const payload = JSON.parse(atob(token.split('.')[1]))
    const role = payload.user?.role
    navigate(role === 'provider' ? '/provider' : '/dashboard')
  }, [login, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Signing you in...</p>
    </div>
  )
}

export default OAuthCallback
