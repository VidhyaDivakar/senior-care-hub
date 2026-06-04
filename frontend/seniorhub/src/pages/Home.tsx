import { useNavigate } from 'react-router-dom'
import { Lightbulb, BookOpen, Newspaper, Heart } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900">Senior NexCore</h1>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-indigo-600 font-medium">Home</button>
          <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-indigo-600 font-medium">About</button>
          <button onClick={() => navigate('/contact')} className="text-gray-600 hover:text-indigo-600 font-medium">Contact</button>
          <button onClick={() => navigate('/login')} className="text-indigo-600 font-medium hover:underline">Login</button>
          <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">Register</button>
          <button onClick={() => navigate('/dashboard')} className="bg-white text-indigo-600 border border-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50">Dashboard</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-8 py-20">
        <h2 className="text-5xl font-bold mb-4">
          <span className="text-black">Connect. Share. </span>
          <span className="text-indigo-600">Learn. Contribute.</span>
        </h2>
        <p className="text-xl text-gray-500 mb-4">Everything you need in one community.</p>
        <p className="text-lg text-gray-400 max-w-xl mb-10">
          A platform for seniors to manage skills, learning requests, and community connections.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 pb-20">
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <Lightbulb className="mx-auto mb-3 text-indigo-600" size={36} />
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Share Your Skills</h3>
          <p className="text-gray-500">Offer your expertise to others in the community.</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <BookOpen className="mx-auto mb-3 text-indigo-600" size={36} />
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Learn New Things</h3>
          <p className="text-gray-500">Request help and discover new skills from peers.</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <Newspaper className="mx-auto mb-3 text-indigo-600" size={36} />
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Community News</h3>
          <p className="text-gray-500">Stay updated with announcements and local events.</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <Heart className="mx-auto mb-3 text-indigo-600" size={36} />
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Support & Connect</h3>
          <p className="text-gray-500">Build meaningful connections and support each other.</p>
        </div>
      </div>

    </div>
  )
}

export default Home
