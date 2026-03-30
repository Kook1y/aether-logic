import type { Equation, SliderConfig, GraphViewport } from '@/types/graph'

export const defaultEquations: Equation[] = [
  {
    id: 'eq-001',
    expression: 'A * sin(B * x)',
    color: '#4edea3',
    visible: true,
    label: 'Sine Wave',
  },
  {
    id: 'eq-002',
    expression: '0.5 * x^3 - 2 * x',
    color: '#d0bcff',
    visible: true,
    label: 'Cubic Polynomial',
  },
]

export const defaultSliders: SliderConfig[] = [
  {
    id: 'slider-a',
    name: 'Amplitude',
    symbol: 'A',
    min: 0.1,
    max: 5,
    step: 0.1,
    value: 1,
  },
  {
    id: 'slider-b',
    name: 'Phase',
    symbol: 'B',
    min: 0.1,
    max: 10,
    step: 0.1,
    value: 1,
  },
]

export const defaultViewport: GraphViewport = {
  xMin: -10,
  xMax: 10,
  yMin: -6,
  yMax: 6,
}
