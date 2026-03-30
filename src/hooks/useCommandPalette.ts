import { useEffect } from 'react'
import { useUIStore } from '@/stores/uiStore'

export function useCommandPalette() {
  const toggleCommandPalette = useUIStore((state) => state.toggleCommandPalette)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleCommandPalette])
}
