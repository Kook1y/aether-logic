import functionPlot from 'function-plot'
import type { Equation, GraphViewport } from '@/types/graph'

export function renderGraph(
  target: HTMLElement,
  equations: Equation[],
  viewport: GraphViewport,
  sliderValues: Record<string, number>
): void {
  const width = target.clientWidth || 600
  const height = target.clientHeight || 400

  const visibleEquations = equations.filter((eq) => eq.visible)

  const data = visibleEquations.map((eq) => {
    let expression = eq.expression
    for (const [symbol, value] of Object.entries(sliderValues)) {
      expression = expression.replace(new RegExp(`\\b${symbol}\\b`, 'g'), String(value))
    }
    return {
      fn: expression,
      color: eq.color,
    }
  })

  target.innerHTML = ''

  functionPlot({
    target,
    width,
    height,
    grid: true,
    xAxis: {
      domain: [viewport.xMin, viewport.xMax],
    },
    yAxis: {
      domain: [viewport.yMin, viewport.yMax],
    },
    data,
  })
}
