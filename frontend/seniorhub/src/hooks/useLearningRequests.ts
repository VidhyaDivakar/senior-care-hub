import { useState, useEffect, useCallback } from 'react'
import { getLearningRequests, createLearningRequest, updateLearningRequest, deleteLearningRequest } from '../api/learningRequests'
import type { LearningRequest } from '../types'

export const useLearningRequests = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRequests = useCallback(() => {
    setLoading(true)
    return getLearningRequests()
      .then(setRequests)
      .catch(() => setError('Failed to load learning requests'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  const addRequest = async (title: string, description: string, status: string) => {
    const created = await createLearningRequest(title, description, status)
    await fetchRequests()
    return created
  }

  const editRequest = async (id: string, title: string, description: string, status: string) => {
    const updated = await updateLearningRequest(id, title, description, status)
    await fetchRequests()
    return updated
  }

  const removeRequest = async (id: string) => {
    await deleteLearningRequest(id)
    await fetchRequests()
  }

  return { requests, loading, error, addRequest, editRequest, removeRequest }
}
