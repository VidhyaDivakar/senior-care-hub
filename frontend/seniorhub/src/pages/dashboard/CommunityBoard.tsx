import { useState, useEffect } from 'react'
import { getCommunityPosts, createCommunityPost } from '../../api/communityPosts'
import type { CommunityPost } from '../../types'

const CommunityBoard = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('General')

  useEffect(() => {
    getCommunityPosts()
      .then(data => setPosts(data))
      .catch(() => setError('Failed to load posts'))
  }, [])

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const newPost = await createCommunityPost(title, content, category)
      setPosts([newPost, ...posts])
      setTitle('')
      setContent('')
      setCategory('General')
    } catch {
      setError('Failed to create post')
    }
  }

  return (
    <div>
      <h2>Community Board</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Announcement">Announcement</option>
            <option value="Workshop">Workshop</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <button type="submit">Post</button>
      </form>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Category: {post.category}</p>
              <p>Posted by: {post.user.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommunityBoard
