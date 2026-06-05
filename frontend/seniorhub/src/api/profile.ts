import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/profile`

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getProfile = async () => {
  const response = await axios.get(API_URL, getAuthHeader())
  return response.data
}

export const saveProfile = async (data: { phone: string; dob: string; location: string; bio: string }) => {
  const response = await axios.put(API_URL, data, getAuthHeader())
  return response.data
}
