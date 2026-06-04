import { useState, useEffect } from 'react'
import { getLearningRequests } from '../../api/learningRequests'
import { BookOpen } from 'lucide-react'

type LearningRequest = {
  _id: string
  title: string
  description: string
  status: string
}

const statusStyle: Record<string, string> = {
  'Open': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Completed': 'bg-green-100 text-green-700',
}

const ProviderView = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getLearningRequests()
      .then(data => setRequests(data.filter((r: LearningRequest) => r.status === 'Open')))
      .catch(() => setError('Failed to load requests'))
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Browse Learning Requests</h2>
        <p className="text-sm text-gray-400 mt-1">These are open requests from seniors looking for help.</p>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-400">No open learning requests at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {requests.map(request => (
            <div key={request._id} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">{request.title}</h4>
              </div>
              <p className="text-sm text-gray-500">{request.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyle[request.status]}`}>
                  {request.status}
                </span>
                <button className="text-sm text-indigo-600 font-medium hover:underline">
                  Send Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProviderView
