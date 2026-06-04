import { useState, useEffect } from 'react'
import { getLearningRequests, createLearningRequest } from '../api/learningRequests'
import type { LearningRequest } from '../types'

export const useLearningRequests = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getLearningRequests()
      .then(setRequests)
      .catch(() => setError('Failed to load learning requests'))
      .finally(() => setLoading(false))
  }, [])

  const addRequest = async (title: string, description: string, status: string) => {
    const created = await createLearningRequest(title, description, status)
    setRequests(prev => [...prev, created])
    return created
  }

  return { requests, loading, error, addRequest }
}
