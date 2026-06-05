import { useNavigate } from 'react-router-dom'
import { Lightbulb, BookOpen, Newspaper, Heart, ArrowRight } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-900">Senior NexCore</h1>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">About</button>
          <button onClick={() => navigate('/contact')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">Contact</button>
          <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">Login</button>
          <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-24 px-8 text-center">
        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full mb-6 inline-block tracking-wide">
          Community Platform for Seniors
        </span>
        <h2 className="text-5xl font-bold mt-6 mb-5 leading-tight">
          Connect. Share.<br />Learn. Contribute.
        </h2>
        <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-10">
          A platform where seniors share skills, request learning opportunities, and connect with service providers.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-indigo-700 px-8 py-3 rounded-lg text-base font-semibold hover:bg-indigo-50 flex items-center gap-2"
          >
            Join the Community <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-white/40 text-white px-8 py-3 rounded-lg text-base hover:bg-white/10"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-indigo-900 text-white py-8 px-10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-indigo-300 text-sm mt-1">Active Seniors</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1,200+</p>
            <p className="text-indigo-300 text-sm mt-1">Skills Shared</p>
          </div>
          <div>
            <p className="text-3xl font-bold">300+</p>
            <p className="text-indigo-300 text-sm mt-1">Providers Connected</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-10">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-2">Everything in one place</h3>
        <p className="text-center text-gray-400 mb-12">Built around the needs of the senior community</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-indigo-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="text-indigo-600" size={28} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Share Skills</h4>
            <p className="text-gray-500 text-sm">Offer your expertise to others in the community.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-purple-600" size={28} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Learn New Things</h4>
            <p className="text-gray-500 text-sm">Request help and discover new skills from peers.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Newspaper className="text-blue-600" size={28} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Community Board</h4>
            <p className="text-gray-500 text-sm">Stay updated with announcements and local events.</p>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-pink-600" size={28} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Support & Connect</h4>
            <p className="text-gray-500 text-sm">Build meaningful connections and support each other.</p>
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-indigo-50 py-16 px-8 text-center">
        <h3 className="text-3xl font-bold text-indigo-900 mb-3">Ready to get started?</h3>
        <p className="text-gray-500 mb-8">Join hundreds of seniors already using Senior NexCore.</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Create Free Account
        </button>
      </div>

      {/* Footer */}
      <footer className="py-6 px-10 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
        <span>© 2025 Senior NexCore</span>
        <div className="flex gap-6">
          <button onClick={() => navigate('/about')} className="hover:text-indigo-600">About</button>
          <button onClick={() => navigate('/contact')} className="hover:text-indigo-600">Contact</button>
        </div>
      </footer>

    </div>
  )
}

export default Home
