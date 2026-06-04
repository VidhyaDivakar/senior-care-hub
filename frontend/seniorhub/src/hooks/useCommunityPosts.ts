import { useState, useEffect } from 'react'
import { getCommunityPosts, createCommunityPost } from '../api/communityPosts'
import type { CommunityPost } from '../types'

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCommunityPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false))
  }, [])

  const addPost = async (title: string, content: string, category: string) => {
    const created = await createCommunityPost(title, content, category)
    setPosts(prev => [created, ...prev])
    return created
  }

  return { posts, loading, error, addPost }
}
