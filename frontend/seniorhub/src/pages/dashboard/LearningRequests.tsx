import { useState } from 'react'
import { useLearningRequests } from '../../hooks/useLearningRequests'
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import type { LearningRequest } from '../../types'

const statusStyle: Record<string, string> = {
  'Open': 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Completed': 'bg-green-100 text-green-700',
}

const emptyForm = { title: '', description: '', status: 'Open' }

const LearningRequests = () => {
  const { requests, error, addRequest, editRequest, removeRequest } = useLearningRequests()
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<LearningRequest | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }
  const openEdit = (request: LearningRequest) => {
    setEditing(request)
    setForm({ title: request.title, description: request.description, status: request.status })
    setShowModal(true)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      if (editing) {
        await editRequest(editing._id, form.title, form.description, form.status)
      } else {
        await addRequest(form.title, form.description, form.status)
      }
      setShowModal(false)
      setForm(emptyForm)
    } catch { }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this learning request?')) return
    try {
      await removeRequest(id)
    } catch { }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Requests</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
          <PlusCircle size={16} /> New Request
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {requests.length === 0 ? (
        <p className="text-gray-400">No learning requests yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
            <thead className="bg-purple-50 text-purple-700">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Title</th>
                <th className="text-left px-6 py-3 font-semibold">Description</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map(request => (
                <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{request.title}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{request.description}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyle[request.status]}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openEdit(request)} className="text-purple-500 hover:text-purple-700">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(request._id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Request' : 'New Learning Request'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">What do you want to learn?</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder='e.g. "Basic Photography"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Describe your learning goal</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Write a short description" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" rows={3} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              {editing ? 'Save Changes' : 'Submit Request'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default LearningRequests
