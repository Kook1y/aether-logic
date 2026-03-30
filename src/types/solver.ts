export type Topic = 'calculus' | 'algebra' | 'statistics' | 'linear-algebra' | 'number-theory' | 'geometry'

export interface SolutionStep {
  id: number
  label: string
  title: string
  explanation: string
  latex: string
  isExpanded: boolean
  accentColor: 'primary' | 'secondary' | 'tertiary'
}

export interface SolverProblem {
  input: string
  topic: Topic
  steps: SolutionStep[]
  finalResult: string
  finalLabel: string
}
