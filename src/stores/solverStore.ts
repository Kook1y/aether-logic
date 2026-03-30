import { create } from 'zustand'
import type { Topic, SolutionStep } from '@/types/solver'
import { findSolution } from '@/data/mockSolutions'

interface SolverStore {
  input: string
  topic: Topic
  steps: SolutionStep[]
  finalResult: string
  finalLabel: string
  isLoading: boolean
  isComplete: boolean
  setInput: (input: string) => void
  setTopic: (topic: Topic) => void
  compute: () => Promise<void>
  toggleStep: (id: number) => void
  reset: () => void
}

export const useSolverStore = create<SolverStore>((set, get) => ({
  input: '',
  topic: 'calculus',
  steps: [],
  finalResult: '',
  finalLabel: '',
  isLoading: false,
  isComplete: false,

  setInput: (input: string) => set({ input }),

  setTopic: (topic: Topic) => set({ topic }),

  compute: async () => {
    const { input } = get()
    if (!input.trim()) return

    set({ isLoading: true, isComplete: false, steps: [], finalResult: '', finalLabel: '' })

    const solution = findSolution(input)

    for (let i = 0; i < solution.steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      set((state) => ({
        steps: [...state.steps, { ...solution.steps[i], isExpanded: true }],
      }))
    }

    await new Promise((resolve) => setTimeout(resolve, 400))
    set({
      finalResult: solution.finalResult,
      finalLabel: solution.finalLabel,
      isLoading: false,
      isComplete: true,
    })
  },

  toggleStep: (id: number) => {
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id ? { ...step, isExpanded: !step.isExpanded } : step
      ),
    }))
  },

  reset: () => {
    set({
      input: '',
      steps: [],
      finalResult: '',
      finalLabel: '',
      isLoading: false,
      isComplete: false,
    })
  },
}))
