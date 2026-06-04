import { useNavigate } from 'react-router-dom'
import LearningRequestCard from './LearningRequestCard'
import type { LearningRequest } from '../../types'

type LearningRequestsPreviewProps = {
  requests: LearningRequest[]
}

const LearningRequestsPreview = ({ requests }: LearningRequestsPreviewProps) => {
  const navigate = useNavigate()
  const preview = requests.slice(0, 2)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-800">Learning Requests</h4>
        {requests.length > 0 && (
          <button
            onClick={() => navigate('/dashboard/learning')}
            className="text-sm text-purple-600 hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      {preview.length === 0 ? (
        <p className="text-gray-400 text-sm">No learning requests yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {preview.map(request => (
            <LearningRequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  )
}

export default LearningRequestsPreview
