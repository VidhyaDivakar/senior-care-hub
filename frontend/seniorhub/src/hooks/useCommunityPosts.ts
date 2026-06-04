import { useState, useEffect, useCallback } from 'react'
import { getCommunityPosts, createCommunityPost, updateCommunityPost, deleteCommunityPost } from '../api/communityPosts'
import type { CommunityPost } from '../types'

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosts = useCallback(() => {
    setLoading(true)
    return getCommunityPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const addPost = async (title: string, content: string, category: string) => {
    const created = await createCommunityPost(title, content, category)
    await fetchPosts()
    return created
  }

  const editPost = async (id: string, title: string, content: string, category: string) => {
    const updated = await updateCommunityPost(id, title, content, category)
    await fetchPosts()
    return updated
  }

  const removePost = async (id: string) => {
    await deleteCommunityPost(id)
    await fetchPosts()
  }

  return { posts, loading, error, addPost, editPost, removePost }
}
