import { useAuth } from './useAuth'

export const useRole = () => {
  const { user } = useAuth()

  // user is null while auth/me is loading — don't assume any role yet
  if (!user) {
    return {
      role: null,
      loaded: false,
      isSenior: false,
      isProvider: false,
      isAdmin: false,
    }
  }

  return {
    role: user.role ?? 'senior',
    loaded: true,
    isSenior: user.role === 'senior' || !user.role,
    isProvider: user.role === 'provider',
    isAdmin: user.role === 'admin',
  }
}
