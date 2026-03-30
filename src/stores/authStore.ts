import { create } from 'zustand'
import { supabase } from '@/config/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  isGuest: boolean
  isLoading: boolean
  error: string | null
  init: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  continueAsGuest: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isGuest: false,
  isLoading: true,
  error: null,

  init: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: session?.user ?? null, isLoading: false })
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, isGuest: false })
    })
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      set({ isLoading: false, isGuest: false })
    }
  },

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      set({ isLoading: false })
    }
  },

  signOut: async () => {
    set({ isLoading: true })
    await supabase.auth.signOut()
    set({ user: null, isGuest: false, isLoading: false })
  },

  continueAsGuest: () => {
    set({ isGuest: true, isLoading: false, user: null })
  },

  clearError: () => {
    set({ error: null })
  },
}))
