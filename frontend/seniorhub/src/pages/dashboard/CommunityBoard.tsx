import { useState } from 'react'
import { useCommunityPosts } from '../../hooks/useCommunityPosts'
import { useAuth } from '../../hooks/useAuth'
import { Pencil, Trash2, PlusCircle, Eye, Mail, Phone, MessageCircle, Share2, Copy, Check } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import type { CommunityPost } from '../../types'

const categoryStyle: Record<string, string> = {
  General: 'bg-gray-100 text-gray-700',
  Event: 'bg-blue-100 text-blue-700',
  Announcement: 'bg-red-100 text-red-700',
  Workshop: 'bg-orange-100 text-orange-700',
  Volunteer: 'bg-green-100 text-green-700',
}

const categoryPin: Record<string, string> = {
  General: 'bg-gray-400',
  Event: 'bg-blue-500',
  Announcement: 'bg-red-500',
  Workshop: 'bg-orange-500',
  Volunteer: 'bg-green-500',
}

const noteColors = [
  'bg-yellow-50 border-yellow-200',
  'bg-blue-50 border-blue-200',
  'bg-green-50 border-green-200',
  'bg-pink-50 border-pink-200',
  'bg-purple-50 border-purple-200',
  'bg-orange-50 border-orange-200',
]

const getNoteColor = (str: string) => {
  const hash = str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return noteColors[hash % noteColors.length]
}

const emptyForm = { title: '', content: '', category: 'General' }

const CommunityBoard = () => {
  const { posts, error, addPost, editPost, removePost } = useCommunityPosts()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewing, setViewing] = useState<CommunityPost | null>(null)
  const [copied, setCopied] = useState(false)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(post => (
            <div
              key={post._id}
              className={`relative border rounded-lg p-5 shadow-sm flex flex-col gap-3 ${getNoteColor(post.title)}`}
            >
              {/* Pin */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full shadow-md border-2 border-white ${categoryPin[post.category]}`}
                  style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}
                />
                <div className="w-1 h-3 bg-gray-500 rounded-b-sm" style={{ marginTop: '-1px' }} />
              </div>

              {/* Category badge */}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${categoryStyle[post.category]}`}>
                {post.category}
              </span>

              {/* Title */}
              <h4 className="font-bold text-gray-800 text-sm leading-snug">{post.title}</h4>

              {/* Content */}
              <p className="text-xs text-gray-600 line-clamp-4 leading-relaxed flex-1">{post.content}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-black/5">
                <span className="text-xs text-gray-400">— {post.user?.username}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openView(post)} className="text-gray-400 hover:text-gray-600">
                    <Eye size={14} />
                  </button>
                  {post.user?._id === user?._id && (
                    <>
                      <button onClick={() => openEdit(post)} className="text-blue-400 hover:text-blue-600">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
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
        <Modal title={viewing.title} onClose={() => { setShowViewModal(false); setCopied(false) }}>
          <div className="flex flex-col gap-5">

            {/* Category + Author */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryStyle[viewing.category]}`}>
                {viewing.category}
              </span>
              <span className="text-sm text-gray-400">by <span className="font-medium text-gray-600">{viewing.user?.username}</span></span>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewing.content}</p>

            <hr className="border-gray-100" />

            {/* Contact */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">For more details, contact us through</p>
              <div className="flex flex-col gap-2">
                <a href={`mailto:${viewing.user?.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-indigo-600">
                  <Mail size={16} className="text-indigo-400" />
                  {viewing.user?.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={16} className="text-indigo-400" />
                  <span>Phone not provided</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MessageCircle size={16} className="text-indigo-400" />
                  <span>Chat — coming soon</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Share */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Share</p>
              <div className="flex gap-3">
                {'share' in navigator && (
                  <button
                    onClick={() => navigator.share({ title: viewing.title, text: viewing.content, url: window.location.href })}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                  >
                    <Share2 size={14} /> Share
                  </button>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  {copied ? <><Check size={14} className="text-green-500" /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                </button>
              </div>
            </div>

          </div>
        </Modal>
      )}
    </div>
  )
}

export default CommunityBoard
