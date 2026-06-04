import { useState } from 'react'
import { useSkills } from '../../hooks/useSkills'
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import type { Skill } from '../../types'

const levelStyle: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const emptyForm = { title: '', category: '', description: '', proficiencyLevel: 'Beginner' }

const MySkills = () => {
  const { skills, error, addSkill, editSkill, removeSkill } = useSkills()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }
  const openEdit = (skill: Skill) => {
    setEditing(skill)
    setForm({ title: skill.title, category: skill.category, description: skill.description, proficiencyLevel: skill.proficiencyLevel })
    setShowModal(true)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      if (editing) {
        await editSkill(editing._id, form.title, form.category, form.description, form.proficiencyLevel)
      } else {
        await addSkill(form.title, form.category, form.description, form.proficiencyLevel)
      }
      setShowModal(false)
      setForm(emptyForm)
    } catch { }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    try {
      await removeSkill(id)
    } catch { }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
          <PlusCircle size={16} /> Add Skill
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {skills.length === 0 ? (
        <p className="text-gray-400">No skills added yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-indigo-50 text-indigo-700">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Title</th>
                <th className="text-left px-6 py-3 font-semibold">Category</th>
                <th className="text-left px-6 py-3 font-semibold">Description</th>
                <th className="text-left px-6 py-3 font-semibold">Level</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {skills.map(skill => (
                <tr key={skill._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{skill.title}</td>
                  <td className="px-6 py-4 text-gray-500">{skill.category}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{skill.description}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelStyle[skill.proficiencyLevel]}`}>
                      {skill.proficiencyLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(skill)} className="text-indigo-500 hover:text-indigo-700">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Skill' : 'Add Skill'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder='e.g. "Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder='e.g. "Arts"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your skill" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" rows={3} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Proficiency Level</label>
              <select value={form.proficiencyLevel} onChange={e => setForm({ ...form, proficiencyLevel: e.target.value })} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              {editing ? 'Save Changes' : 'Add Skill'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default MySkills
