import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-indigo-100 flex flex-col items-center justify-center text-center px-8">
      <h1 className="text-5xl font-bold text-indigo-900 mb-4">SeniorCare Hub</h1>
      <h2 className="text-2xl font-medium text-indigo-700 mb-6">Connect. Share. Learn. Contribute.</h2>
      <p className="text-lg text-indigo-600 max-w-xl mb-10">
        A platform for seniors to manage skills, learning requests, and community connections.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg text-lg hover:bg-indigo-50"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Home
