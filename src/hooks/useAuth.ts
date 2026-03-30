import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const { user, isGuest, isLoading, error, init } = useAuthStore()

  useEffect(() => {
    init()
  }, [init])

  return { user, isGuest, isLoading, error }
}
