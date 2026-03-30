import { useEffect, type RefObject } from 'react'
import { useGraphStore } from '@/stores/graphStore'
import { renderGraph } from '@/lib/graphEngine'

export function useGraph(containerRef: RefObject<HTMLDivElement | null>) {
  const equations = useGraphStore((state) => state.equations)
  const sliders = useGraphStore((state) => state.sliders)
  const viewport = useGraphStore((state) => state.viewport)
  const cursorPos = useGraphStore((state) => state.cursorPos)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sliderValues: Record<string, number> = {}
    for (const slider of sliders) {
      sliderValues[slider.symbol] = slider.value
    }

    try {
      renderGraph(container, equations, viewport, sliderValues)
    } catch {
      // Silently handle render errors (e.g., invalid expressions)
    }
  }, [equations, sliders, viewport, containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      const sliderValues: Record<string, number> = {}
      for (const slider of sliders) {
        sliderValues[slider.symbol] = slider.value
      }

      try {
        renderGraph(container, equations, viewport, sliderValues)
      } catch {
        // Silently handle render errors
      }
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [equations, sliders, viewport, containerRef])

  return { cursorPos }
}
