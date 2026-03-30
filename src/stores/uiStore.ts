import { create } from 'zustand'

interface UIStore {
  commandPaletteOpen: boolean
  focusMode: boolean
  sideNavExpanded: boolean
  toggleCommandPalette: () => void
  toggleFocusMode: () => void
  toggleSideNav: () => void
  closePalette: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  commandPaletteOpen: false,
  focusMode: false,
  sideNavExpanded: true,

  toggleCommandPalette: () => {
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen }))
  },

  toggleFocusMode: () => {
    set((state) => ({ focusMode: !state.focusMode }))
  },

  toggleSideNav: () => {
    set((state) => ({ sideNavExpanded: !state.sideNavExpanded }))
  },

  closePalette: () => {
    set({ commandPaletteOpen: false })
  },
}))
