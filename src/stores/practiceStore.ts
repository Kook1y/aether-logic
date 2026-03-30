import { create } from 'zustand'
import type { Difficulty, Curriculum, PracticeSet, PastPaper } from '@/types/practice'
import { practiceSets as mockPracticeSets, pastPapers as mockPastPapers } from '@/data/mockPracticeSets'

interface PracticeFilters {
  topic: string | null
  difficulty: Difficulty | null
  curriculum: Curriculum | null
  yearRange: [number, number]
}

interface PracticeStore {
  filters: PracticeFilters
  practiceSets: PracticeSet[]
  pastPapers: PastPaper[]
  streak: {
    days: string[]
    count: number
  }
  setFilter: <K extends keyof PracticeFilters>(key: K, value: PracticeFilters[K]) => void
  resetFilters: () => void
  loadData: () => void
}

const defaultFilters: PracticeFilters = {
  topic: null,
  difficulty: null,
  curriculum: null,
  yearRange: [2020, 2025],
}

export const usePracticeStore = create<PracticeStore>((set) => ({
  filters: { ...defaultFilters },
  practiceSets: mockPracticeSets,
  pastPapers: mockPastPapers,
  streak: {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    count: 5,
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }))
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters } })
  },

  loadData: () => {
    set({
      practiceSets: mockPracticeSets,
      pastPapers: mockPastPapers,
    })
  },
}))
