import { useEffect, type RefObject } from 'react'

type UseScrollIntoViewOptions = {
  containerRef: RefObject<HTMLElement | null>
  selector: string | null
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  onScrolled?: () => void
  focus?: boolean
  offsetByElementHeight?: boolean
}

export const useScrollIntoView = ({
  containerRef,
  selector,
  behavior = 'smooth',
  block = 'nearest',
  onScrolled,
  focus = false,
  offsetByElementHeight = false,
}: UseScrollIntoViewOptions) => {
  useEffect(() => {
    if (!selector || !containerRef.current) return

    const container = containerRef.current
    const element = container?.querySelector(selector) as HTMLElement | null
    if (element && container) {
      element.scrollIntoView({ block, behavior })

      // Apply offset by scrolling the window by the element's height
      if (offsetByElementHeight) {
        const offset = element.getBoundingClientRect().height
        window.scrollBy({ top: offset, behavior })
      }

      if (focus) {
        // Find first focusable input element within the block (skip disabled and hidden inputs)
        const focusable = element.querySelector<HTMLElement>(
          'input:not([type="hidden"]):not(:disabled), textarea:not(:disabled), [contenteditable="true"], select:not(:disabled)'
        )
        focusable?.focus()
      }

      onScrolled?.()
    }
  }, [selector, containerRef, behavior, block, onScrolled, focus, offsetByElementHeight])
}

