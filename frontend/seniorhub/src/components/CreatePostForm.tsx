import { useState } from 'react'
import { createCommunityPost } from '../api/communityPosts'
import Modal from './Modal'

type CreatePostFormProps = {
  onClose: () => void
  onSuccess: (post: any) => void
}

const CreatePostForm = ({ onClose, onSuccess }: CreatePostFormProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('General')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newPost = await createCommunityPost(title, content, category)
      onSuccess(newPost)
      onClose()
    } catch { }
  }

  return (
    <Modal title="Create Post" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="postTitle" className="text-sm font-medium text-gray-700">Post Title</label>
          <input id="postTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='e.g. "Weekend Gardening Workshop"' required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="postContent" className="text-sm font-medium text-gray-700">Content</label>
          <textarea id="postContent" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post content here" required className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="postCategory" className="text-sm font-medium text-gray-700">Category</label>
          <select id="postCategory" value={category} onChange={e => setCategory(e.target.value)} className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Announcement">Announcement</option>
            <option value="Workshop">Workshop</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Create Post</button>
      </form>
    </Modal>
  )
}

export default CreatePostForm
