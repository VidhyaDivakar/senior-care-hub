import { useState } from 'react'
import { createLearningRequest } from '../api/learningRequests'
import Modal from './Modal'

type AddLearningFormProps = {
  onClose: () => void
  onSuccess: (request: any) => void
}

const AddLearningForm = ({ onClose, onSuccess }: AddLearningFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('Beginner')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      // Preferred Level is appended to description as workaround — backend has no preferredLevel field
      const fullDescription = `${description} | Preferred Level: ${level}`
      const newRequest = await createLearningRequest(title, fullDescription, 'Open')
      onSuccess(newRequest)
      onClose()
    } catch { }
  }

  return (
    <Modal title="New Learning Request" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="learnTitle" className="text-sm font-medium text-gray-700">What do you want to learn?</label>
          <input id="learnTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='e.g. "Basic Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="learnDescription" className="text-sm font-medium text-gray-700">Describe your learning goal</label>
          <textarea id="learnDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Write a short description" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" rows={3} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="learnLevel" className="text-sm font-medium text-gray-700">Preferred Level</label>
          <select id="learnLevel" value={level} onChange={e => setLevel(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="" disabled>Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Submit Request</button>
      </form>
    </Modal>
  )
}

export default AddLearningForm
