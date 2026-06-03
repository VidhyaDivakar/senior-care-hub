// functions that calls the backend login endpoint
import axios from 'axios'

const API_URL = 'http://localhost:3006/api/learning-requests'

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const getLearningRequests = async () => {
  const response = await axios.get(API_URL, getAuthHeader())
  return response.data
}

export const createLearningRequest = async (title: string, description: string, status: string) => {
  const response = await axios.post(API_URL, { title, description, status }, getAuthHeader())
  return response.data
}
