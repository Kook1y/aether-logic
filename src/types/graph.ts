export interface Equation {
  id: string
  expression: string
  color: string
  visible: boolean
  label?: string
}

export interface SliderConfig {
  id: string
  name: string
  symbol: string
  min: number
  max: number
  step: number
  value: number
}

export interface GraphViewport {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export interface PointOfInterest {
  label: string
  x: number
  y: number
}
