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
