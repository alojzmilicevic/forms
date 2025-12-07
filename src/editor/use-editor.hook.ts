import { useRef, useEffect, useCallback } from 'react'
import { useEditorStore } from '@/store/editor-store'
import { useScrollIntoView } from '@/hooks/scroll-into-view.hook'
import { renderEditorBlock } from '@/blocks/block-factory'
import { isGroupableBlock } from '@/manifest.type'
import type { Block as BlockType } from '@/manifest.type'

export const useEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  // Store subscriptions
  const blocks = useEditorStore((state) => state.manifest.blocks)
  const name = useEditorStore((state) => state.manifest.name)
  const focusedGroup = useEditorStore((state) => state.focusedGroup)
  const lastAddedBlockId = useEditorStore((state) => state.lastAddedBlockId)
  const setFocusedGroup = useEditorStore((state) => state.setFocusedGroup)
  const addBlock = useEditorStore((state) => state.addBlock)
  const deleteBlock = useEditorStore((state) => state.deleteBlock)
  const updateName = useEditorStore((state) => state.updateName)
  const clearLastAddedBlockId = useEditorStore((state) => state.clearLastAddedBlockId)

  // Scroll newly added blocks into view and focus the input
  useScrollIntoView({
    containerRef: editorRef,
    selector: lastAddedBlockId ? `[data-block-id="${lastAddedBlockId}"]` : null,
    onScrolled: clearLastAddedBlockId,
    focus: true,
    offsetByElementHeight: true,
  })

  // Handle focus tracking for groups
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
  }, [focusedGroup, blocks, setFocusedGroup])

  // Block rendering logic
  const getBlockWrapperProps = useCallback(
    (block: BlockType) => {
      const wrapperProps = {
        blockId: block.id,
        onDelete: () => deleteBlock(block.id),
        ...(isGroupableBlock(block) && {
          isLast: block.isLast,
          groupId: block.groupId,
        }),
      }

      return wrapperProps
    },
    [deleteBlock]
  )

  const renderBlockComponent = useCallback(
    (block: BlockType) => {
      const blockElement = renderEditorBlock(block)

      if (!blockElement) {
        return null
      }

      const wrapperProps = getBlockWrapperProps(block)

      return { blockElement, wrapperProps }
    },
    [getBlockWrapperProps]
  )

  return {
    editorRef,
    blocks,
    name,
    updateName,
    addBlock,
    renderBlockComponent,
  }
}
