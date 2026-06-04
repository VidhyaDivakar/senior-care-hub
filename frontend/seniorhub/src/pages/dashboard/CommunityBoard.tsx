import { useState } from 'react'
import { useCommunityPosts } from '../../hooks/useCommunityPosts'
import { useAuth } from '../../hooks/useAuth'
import { Pencil, Trash2, PlusCircle, Eye } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import type { CommunityPost } from '../../types'

const categoryStyle: Record<string, string> = {
  General: 'bg-gray-100 text-gray-700',
  Event: 'bg-blue-100 text-blue-700',
  Announcement: 'bg-red-100 text-red-700',
  Workshop: 'bg-orange-100 text-orange-700',
  Volunteer: 'bg-green-100 text-green-700',
}

const emptyForm = { title: '', content: '', category: 'General' }

const CommunityBoard = () => {
  const { posts, error, addPost, editPost, removePost } = useCommunityPosts()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewing, setViewing] = useState<CommunityPost | null>(null)
  const [editing, setEditing] = useState<CommunityPost | null>(null)
  const [form, setForm] = useState(emptyForm)

  const openView = (post: CommunityPost) => { setViewing(post); setShowViewModal(true) }

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }
  const openEdit = (post: CommunityPost) => {
    setEditing(post)
    setForm({ title: post.title, content: post.content, category: post.category })
    setShowModal(true)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      if (editing) {
        await editPost(editing._id, form.title, form.content, form.category)
      } else {
        await addPost(form.title, form.content, form.category)
      }
      setShowModal(false)
      setForm(emptyForm)
    } catch { }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await removePost(id)
    } catch { }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Community Board</h2>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <PlusCircle size={16} /> Create Post
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-blue-700">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Title</th>
                <th className="text-left px-6 py-3 font-semibold">Content</th>
                <th className="text-left px-6 py-3 font-semibold">Category</th>
                <th className="text-left px-6 py-3 font-semibold">Posted By</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{post.content}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryStyle[post.category]}`}>
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{post.user?.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openView(post)} className="text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                      {post.user?._id === user?._id && (
                        <>
                          <button onClick={() => openEdit(post)} className="text-blue-500 hover:text-blue-700">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Post' : 'Create Post'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Post Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder='e.g. "Weekend Gardening Workshop"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Content</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write your post content" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="General">General</option>
                <option value="Event">Event</option>
                <option value="Announcement">Announcement</option>
                <option value="Workshop">Workshop</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              {editing ? 'Save Changes' : 'Create Post'}
            </button>
          </form>
        </Modal>
      )}

      {showViewModal && viewing && (
        <Modal title={viewing.title} onClose={() => setShowViewModal(false)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryStyle[viewing.category]}`}>
                {viewing.category}
              </span>
              <span className="text-sm text-gray-400">by {viewing.user?.username}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewing.content}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CommunityBoard
