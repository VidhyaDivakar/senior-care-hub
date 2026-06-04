import { useState, useEffect } from 'react'
import { getLearningRequests, createLearningRequest } from '../../api/learningRequests'
import type { LearningRequest } from '../../types'

const LearningRequests = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Open')

  useEffect(() => {
    getLearningRequests()
      .then(data => setRequests(data))
      .catch(() => setError('Failed to load learning requests'))
  }, [])

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newRequest = await createLearningRequest(title, description, status)
      setRequests([...requests, newRequest])
      setTitle('')
      setDescription('')
      setStatus('Open')
    } catch {
      setError('Failed to create learning request')
    }
  }

  return (
    <div>
      <h2>Learning Requests</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Request</button>
      </form>

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
