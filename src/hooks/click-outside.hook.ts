import { useEffect } from 'react'
import type { RefObject } from 'react'

type UseClickOutsideOptions = {
  enabled?: boolean
  handler: () => void
}

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled = true, handler }: UseClickOutsideOptions
) => {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [enabled, handler, ref])
}

