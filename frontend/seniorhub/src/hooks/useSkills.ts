import { useState, useEffect, useCallback } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../api/skills'
import type { Skill } from '../types'

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchSkills = useCallback(() => {
    setLoading(true)
    return getSkills()
      .then(setSkills)
      .catch(() => setError('Failed to load skills'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const addSkill = async (title: string, category: string, description: string, proficiencyLevel: string) => {
    const created = await createSkill(title, category, description, proficiencyLevel)
    await fetchSkills()
    return created
  }

  const editSkill = async (id: string, title: string, category: string, description: string, proficiencyLevel: string) => {
    const updated = await updateSkill(id, title, category, description, proficiencyLevel)
    await fetchSkills()
    return updated
  }

  const removeSkill = async (id: string) => {
    await deleteSkill(id)
    await fetchSkills()
  }

  return { skills, loading, error, addSkill, editSkill, removeSkill }
}
