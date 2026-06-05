import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-10 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900 cursor-pointer" onClick={() => navigate('/')}>Senior NexCore</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Home</button>
          <button onClick={() => navigate('/contact')} className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Contact</button>
          <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">Login</button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Senior NexCore</h2>
        <p className="text-lg text-gray-500 leading-relaxed mb-4">
          Senior NexCore is a community-driven platform that empowers seniors to share their skills, request learning opportunities, and connect with service providers who can fulfill their needs.
        </p>
        <p className="text-lg text-gray-500 leading-relaxed">
          Our mission is to bridge the gap between seniors and the people and organisations who can support them — making connection simple, safe, and meaningful.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
            Join the Community
          </button>
          <button onClick={() => navigate('/contact')} className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-medium">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
