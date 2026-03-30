import type { User } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  isGuest: boolean
  isLoading: boolean
  error: string | null
}
