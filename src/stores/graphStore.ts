import { create } from 'zustand'
import type { Equation, SliderConfig, GraphViewport } from '@/types/graph'
import { defaultEquations, defaultSliders, defaultViewport } from '@/data/mockEquations'

interface GraphStore {
  equations: Equation[]
  sliders: SliderConfig[]
  viewport: GraphViewport
  cursorPos: { x: number; y: number } | null
  addEquation: (equation: Equation) => void
  removeEquation: (id: string) => void
  updateEquation: (id: string, updates: Partial<Equation>) => void
  toggleEquation: (id: string) => void
  updateSlider: (id: string, value: number) => void
  setViewport: (viewport: GraphViewport) => void
  resetViewport: () => void
  setCursorPos: (pos: { x: number; y: number } | null) => void
}

export const useGraphStore = create<GraphStore>((set) => ({
  equations: defaultEquations,
  sliders: defaultSliders,
  viewport: defaultViewport,
  cursorPos: null,

  addEquation: (equation: Equation) => {
    set((state) => ({ equations: [...state.equations, equation] }))
  },

  removeEquation: (id: string) => {
    set((state) => ({ equations: state.equations.filter((eq) => eq.id !== id) }))
  },

  updateEquation: (id: string, updates: Partial<Equation>) => {
    set((state) => ({
      equations: state.equations.map((eq) => (eq.id === id ? { ...eq, ...updates } : eq)),
    }))
  },

  toggleEquation: (id: string) => {
    set((state) => ({
      equations: state.equations.map((eq) =>
        eq.id === id ? { ...eq, visible: !eq.visible } : eq
      ),
    }))
  },

  updateSlider: (id: string, value: number) => {
    set((state) => ({
      sliders: state.sliders.map((s) => (s.id === id ? { ...s, value } : s)),
    }))
  },

  setViewport: (viewport: GraphViewport) => set({ viewport }),

  resetViewport: () => set({ viewport: defaultViewport }),

  setCursorPos: (pos: { x: number; y: number } | null) => set({ cursorPos: pos }),
}))
