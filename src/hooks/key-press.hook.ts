import { useState, useEffect } from 'react'

type useKeyPressProps = {
  keys?: string[]
  codes?: string[]
  require?: ('shift' | 'ctrl' | 'ctrlOrCmd' | 'alt')[]
  disabled?: boolean
  onKeyDown?: (e: KeyboardEvent) => void
  onKeyUp?: (e: KeyboardEvent) => void
  preventKeyDefault?: boolean
  preventRepeat?: boolean
}

export function useKeyPress({
  keys,
  codes,
  require,
  disabled,
  onKeyDown,
  onKeyUp,
  preventKeyDefault,
  preventRepeat,
}: useKeyPressProps) {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    if (disabled) return

    const correctCombinationPressed = (e: KeyboardEvent) => {
      const { key, code, shiftKey, ctrlKey, altKey, metaKey } = e

      if (require?.includes('shift') && !shiftKey) return false
      if (require?.includes('ctrl') && !ctrlKey) return false
      if (require?.includes('ctrlOrCmd') && !ctrlKey && !metaKey) return false
      if (require?.includes('alt') && !altKey) return false

      return (
        keys?.some((k) => k.toLowerCase() === key?.toLowerCase()) || codes?.some((c) => c === code)
      )
    }

    const downHandler = (e: KeyboardEvent) => {
      if (preventRepeat && e.repeat) return false
      if (correctCombinationPressed(e)) {
        if (preventKeyDefault) e.preventDefault()
        onKeyDown?.(e)
        // Only track state if eventhandlers are not used - to prevent unnecessary renders.
        if (!onKeyDown && !onKeyUp) {
          setKeyPressed(true)
        }
      }
    }

    const upHandler = (e: KeyboardEvent) => {
      /* When the meta key is pressed it blocks all other key-up events, this
				is a known behaviour: https://stackoverflow.com/a/27512489/6769954 */
      /* When cmd key is released e.metaKey is false */
      if (correctCombinationPressed(e) || (require?.includes('ctrlOrCmd') && e.key === 'Meta')) {
        if (preventKeyDefault) e.preventDefault()
        onKeyUp?.(e)
        if (!onKeyDown && !onKeyUp) {
          setKeyPressed(false)
        }
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [codes, keys, onKeyDown, onKeyUp, preventKeyDefault, preventRepeat, require, disabled])

  return keyPressed
}
