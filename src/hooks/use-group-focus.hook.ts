import { useState, useEffect, type RefObject } from 'react'
import type { Block as BlockType } from '@/manifest.type'

export const useGroupFocus = (
  editorRef: RefObject<HTMLDivElement | null>,
  blocks: BlockType[]
) => {
  const [focusedGroup, setFocusedGroup] = useState<string | null>(null)

  useEffect(() => {
    const handleFocus = (blockId: string) => {
      const block = blocks.find((b) => b.id === blockId)
      if (!block) return

      const newGroupId = block.type === 'checkbox' ? block.groupId : null
      if (focusedGroup === newGroupId) return
      setFocusedGroup(newGroupId)
    }

    const handleFocusCapture = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      const blockElement = target.closest('[data-block-id]') as HTMLElement
      if (blockElement) {
        const blockId = blockElement.getAttribute('data-block-id')
        if (blockId) {
          handleFocus(blockId)
        }
      }
    }

    const editorElement = editorRef.current
    if (editorElement) {
      editorElement.addEventListener('focus', handleFocusCapture, true)
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('focus', handleFocusCapture, true)
      }
    }
  }, [focusedGroup, blocks, editorRef])

  return { focusedGroup, setFocusedGroup }
}

