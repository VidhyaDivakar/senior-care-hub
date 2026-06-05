import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-10 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900 cursor-pointer" onClick={() => navigate('/')}>Senior NexCore</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-indigo-600 text-sm font-medium">Home</button>
          <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-indigo-600 text-sm font-medium">About</button>
          <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">Login</button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-500">We'd love to hear from you. Reach out and we'll get back to you shortly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-indigo-50 rounded-xl p-6 text-center">
            <Mail size={28} className="text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-sm text-gray-500 mt-1">hello@seniornexcore.com</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 text-center">
            <Phone size={28} className="text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-sm text-gray-500 mt-1">+1 (800) 123-4567</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 text-center">
            <MapPin size={28} className="text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700">Location</p>
            <p className="text-sm text-gray-500 mt-1">New York, USA</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Send a Message</h3>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input type="text" placeholder="Your name" className="border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" placeholder="Your email" className="border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea rows={5} placeholder="Write your message..." className="border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
