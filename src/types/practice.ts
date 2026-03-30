export type Difficulty = 'foundation' | 'intermediate' | 'advanced'
export type Curriculum = 'A-Level' | 'IB' | 'AP' | 'Cambridge' | 'Oxford'

export interface PracticeSet {
  id: string
  title: string
  subtitle?: string
  topic: string
  difficulty: Difficulty
  questionCount: number
  estimatedMinutes: number
  successRate: number
  points: number
  isFeatured?: boolean
}

export interface PastPaper {
  id: string
  title: string
  curriculum: Curriculum
  year: number
  paperInfo: string
  submissions: string
  avgScore: string
}

export interface TopicVelocity {
  topic: string
  progress: number
  color: 'primary' | 'secondary' | 'tertiary'
}
