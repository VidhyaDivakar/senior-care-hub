import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/skills`

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

})
export const getSkills = async () => {
const response = await axios.get(API_URL, getAuthHeader())
return response.data
}

export const createSkill = async (title: string, category: string, description: string, proficiencyLevel: string) => {
  const response = await axios.post(API_URL, { title, category, description, proficiencyLevel }, getAuthHeader())
  return response.data
}

export const updateSkill = async (id: string, title: string, category: string, description: string, proficiencyLevel: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, category, description, proficiencyLevel }, getAuthHeader())
  return response.data
}

export const deleteSkill = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader())
  return response.data
}