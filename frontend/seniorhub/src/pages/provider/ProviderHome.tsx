import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOpenLearningRequests } from '../../api/learningRequests'
import { useAuth } from '../../hooks/useAuth'
import { BookOpen, LogOut } from 'lucide-react'
import type { LearningRequest } from '../../types'

const gradients = [
  'from-purple-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-blue-400 to-violet-500',
  'from-indigo-400 to-blue-500',
]

const getGradient = (str: string) => {
  const hash = str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

const ProviderHome = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getOpenLearningRequests()
      .then(setRequests)
      .catch(() => setError('Failed to load requests'))
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm px-10 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-900">Senior NexCore</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Welcome, <span className="font-medium text-gray-700">{user?.username}</span>
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Provider</span>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Open Learning Requests</h2>
          <p className="text-sm text-gray-400 mt-1">Seniors looking for help — reach out to connect.</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-400">No open learning requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {requests.map(request => (
              <div key={request._id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradient(request.title)} flex items-center justify-center flex-shrink-0`}>
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{request.title}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Open</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{request.description}</p>
                <button className="mt-auto bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700">
                  Send Offer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default ProviderHome
