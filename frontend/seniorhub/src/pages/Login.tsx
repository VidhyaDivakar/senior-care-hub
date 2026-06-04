import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-600 mb-1">Senior NexCore</h1>
          <p className="text-gray-400 text-sm">Welcome back — sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={async (e) => {
          e.preventDefault()
          try {
            const data = await loginUser(email, password)
            login(data.token)
            navigate('/dashboard')
          } catch {
            setError('Invalid email or password')
          }
        }} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-indigo-600 font-medium hover:underline">
            Register
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login
