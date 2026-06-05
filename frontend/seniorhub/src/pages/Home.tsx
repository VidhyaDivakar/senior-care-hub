import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'

const heroImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&fit=crop',
]

const Home = () => {
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 sm:px-10 py-4 border-b border-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">Senior NexCore</h1>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">About</button>
          <button onClick={() => navigate('/contact')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">Contact</button>
          <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-indigo-600 font-medium text-sm">Login</button>
          <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium">Get Started</button>
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden text-gray-600 hover:text-indigo-600" onClick={() => setMobileMenuOpen(v => !v)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-md flex flex-col py-4 px-6 gap-4 sm:hidden z-50">
            <button onClick={() => { navigate('/about'); setMobileMenuOpen(false) }} className="text-left text-gray-600 hover:text-indigo-600 font-medium text-sm">About</button>
            <button onClick={() => { navigate('/contact'); setMobileMenuOpen(false) }} className="text-left text-gray-600 hover:text-indigo-600 font-medium text-sm">Contact</button>
            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false) }} className="text-left text-gray-600 hover:text-indigo-600 font-medium text-sm">Login</button>
            <button onClick={() => { navigate('/register'); setMobileMenuOpen(false) }} className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium text-left">Get Started</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0)    translateY(0); }
          100% { transform: scale(1.1)  translateX(-2%)  translateY(-1%); }
        }
        .ken-burns { animation: kenBurns 8s ease-in-out forwards; }
      `}</style>
      <div className="relative overflow-hidden text-white py-24 px-8 text-center" style={{ minHeight: 420 }}>
        {/* Cycling background images */}
        {heroImages.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === currentImage ? 'ken-burns' : ''}`}
            style={{ backgroundImage: `url(${img})`, opacity: i === currentImage ? 1 : 0 }}
          />
        ))}
        {/* Gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/50 to-purple-800/50" />

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-5' : 'bg-white/40'}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full mb-6 inline-block tracking-wide">
            Community Platform
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-6 mb-5 leading-tight">
            Connect. Share.<br />Learn. Contribute.
          </h2>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-10">
            A place to share skills, request learning opportunities, and connect with people who can help.
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
      </div>

      {/* Stats bar */}
      <div className="bg-indigo-700 text-white py-8 px-10">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="text-indigo-300 text-sm mt-1">Active Members</p>
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
      <div className="py-12 sm:py-20 px-6 sm:px-10">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-2">Everything in one place</h3>
        <p className="text-center text-gray-400 mb-12">Built around the needs of the community</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-72"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-indigo-800/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h4 className="text-xl font-bold text-white mb-2">You have a skill?</h4>
              <p className="text-white/80 text-sm leading-relaxed">Share what you know — cooking, gardening, music, crafts.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-72"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-indigo-800/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h4 className="text-xl font-bold text-white mb-2">Want to learn?</h4>
              <p className="text-white/80 text-sm leading-relaxed">Post what you'd like to learn and let peers come to you.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-72"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-indigo-800/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h4 className="text-xl font-bold text-white mb-2">Stay in the loop</h4>
              <p className="text-white/80 text-sm leading-relaxed">Workshops, events, announcements — all on the community board.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 h-72"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-indigo-800/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h4 className="text-xl font-bold text-white mb-2">Real connections</h4>
              <p className="text-white/80 text-sm leading-relaxed">Meet people who care. This is your community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-indigo-50 py-16 px-8 text-center">
        <h3 className="text-3xl font-bold text-indigo-900 mb-3">Ready to get started?</h3>
        <p className="text-gray-500 mb-8">Join hundreds of people already using Senior NexCore.</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Create Free Account
        </button>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 sm:px-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
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
