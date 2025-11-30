import { useEffect } from 'react'

type UseEscapeKeyOptions = {
  enabled?: boolean
  handler: () => void
}

export const useEscapeKey = ({ enabled = true, handler }: UseEscapeKeyOptions) => {
  useEffect(() => {
    if (!enabled) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [enabled, handler])
}

