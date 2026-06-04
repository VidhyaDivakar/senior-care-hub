import { useState, useEffect } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../api/skills'
import type { Skill } from '../types'

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => setError('Failed to load skills'))
      .finally(() => setLoading(false))
  }, [])

  const addSkill = async (title: string, category: string, description: string, proficiencyLevel: string) => {
    const created = await createSkill(title, category, description, proficiencyLevel)
    setSkills(prev => [...prev, created])
    return created
  }

  const editSkill = async (id: string, title: string, category: string, description: string, proficiencyLevel: string) => {
    const updated = await updateSkill(id, title, category, description, proficiencyLevel)
    setSkills(prev => prev.map(s => s._id === updated._id ? updated : s))
    return updated
  }

  const removeSkill = async (id: string) => {
    await deleteSkill(id)
    setSkills(prev => prev.filter(s => s._id !== id))
  }

  return { skills, loading, error, addSkill, editSkill, removeSkill }
}
