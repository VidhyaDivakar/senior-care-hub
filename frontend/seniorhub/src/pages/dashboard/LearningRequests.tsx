import { useState, useEffect } from 'react'
import { getLearningRequests } from '../../api/learningRequests'

type LearningRequest = {
  _id: string
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Completed'
}

const LearningRequests = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getLearningRequests()
      .then(data => setRequests(data))
      .catch(() => setError('Failed to load learning requests'))
  }, [])

  return (
    <div>
      <h2>Learning Requests</h2>
      {error && <p>{error}</p>}
      {requests.length === 0 ? (
        <p>No learning requests yet.</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              <h3>{request.title}</h3>
              <p>{request.description}</p>
              <p>Status: {request.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LearningRequests
