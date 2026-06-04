import { useAuth } from './useAuth'

export const useRole = () => {
  const { user } = useAuth()

  return {
    role: user?.role ?? null,
    isSenior: user?.role === 'senior',
    isProvider: user?.role === 'provider',
    isAdmin: user?.role === 'admin',
  }
}
