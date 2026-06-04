import { useState } from 'react'
import { createSkill } from '../../api/skills'
import Modal from '../ui/Modal'

type AddSkillFormProps = {
  onClose: () => void
  onSuccess: (skill: any) => void
}

const AddSkillForm = ({ onClose, onSuccess }: AddSkillFormProps) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [proficiencyLevel, setProficiencyLevel] = useState('Beginner')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newSkill = await createSkill(title, category, description, proficiencyLevel)
      onSuccess(newSkill)
      onClose()
    } catch { }
  }

  return (
    <Modal title="Add Skill" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="skillTitle" className="text-sm font-medium text-gray-700">Skill Title</label>
          <input id="skillTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='e.g. "Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="skillCategory" className="text-sm font-medium text-gray-700">Category</label>
          <input id="skillCategory" type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder='e.g. "Arts"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="skillDescription" className="text-sm font-medium text-gray-700">Description</label>
          <textarea id="skillDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your skill" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" rows={3} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="skillLevel" className="text-sm font-medium text-gray-700">Proficiency Level</label>
          <select id="skillLevel" value={proficiencyLevel} onChange={e => setProficiencyLevel(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Add Skill</button>
      </form>
    </Modal>
  )
}

export default AddSkillForm
