import axios from 'axios'

const API_URL = 'http://localhost:3006/api/posts'

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getCommunityPosts = async () => {
  const response = await axios.get(API_URL, getAuthHeader())
  return response.data
}

export const createCommunityPost = async (title: string, content: string, category: string) => {
  const response = await axios.post(API_URL, { title, content, category }, getAuthHeader())
  return response.data
}

export const updateCommunityPost = async (id: string, title: string, content: string, category: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, content, category }, getAuthHeader())
  return response.data
}

export const deleteCommunityPost = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader())
  return response.data
}
