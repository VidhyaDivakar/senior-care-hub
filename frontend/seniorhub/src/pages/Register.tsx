import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={async (e) => {
        e.preventDefault()
        try {
          await registerUser(username, email, password)
          navigate('/login')
        } catch (err) {
          setError('Registration failed. Try again.')
        }
      }}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
