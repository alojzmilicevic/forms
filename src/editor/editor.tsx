import { BlockWrapper } from '@/blocks/block-wrapper/block-wrapper'
import { Button } from '@/components/button/button'
import { renderEditorBlock, createBlock } from '@/blocks/block-factory'
import { Search } from './search/search'
import type { Block as BlockType, BlockType as BlockTypeEnum, Manifest } from '@/manifest.type'
import { isGroupableBlock } from '@/manifest.type'
import { EditableText } from '@/blocks/components/editable-text/editable-text'
import { useState, useRef, useEffect } from 'react'
import styles from './editor.module.scss'

type EditorProps = {
  manifest: Manifest
  setBlocks: (blocks: BlockType[]) => void
  handleUpdateName: (name: string) => void
}

const recalculateGroup = (blocks: BlockType[], groupId: string): BlockType[] => {
  const groupBlocks = blocks.filter((b) => isGroupableBlock(b) && b.groupId === groupId)
  const maxIndex = groupBlocks.length - 1

  // Create a map of block ID to new groupIndex
  const groupIndexMap = new Map<string, number>()
  groupBlocks.forEach((block, index) => {
    groupIndexMap.set(block.id, index)
  })

  return blocks.map((b) => {
    if (isGroupableBlock(b) && b.groupId === groupId) {
      const newGroupIndex = groupIndexMap.get(b.id) ?? b.groupIndex
      return {
        ...b,
        groupIndex: newGroupIndex,
        isLast: newGroupIndex === maxIndex,
        isFirst: newGroupIndex === 0,
      }
    }
    return b
  })
}

export const Editor = ({ manifest, setBlocks, handleUpdateName }: EditorProps) => {
  const { blocks, name } = manifest
  const [focusedGroup, setFocusedGroup] = useState<string | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const handleAddBlock = (blockType: BlockTypeEnum, groupId?: string) => {
    const block = createBlock(blockType, blocks, groupId)
    let newBlocks: BlockType[]

    if (isGroupableBlock(block) && groupId) {
      const groupBlocks = blocks.filter((b) => isGroupableBlock(b) && b.groupId === groupId)
      if (groupBlocks.length > 0) {
        const lastGroupBlock = groupBlocks[groupBlocks.length - 1]
        const insertIndex = blocks.findIndex((b) => b.id === lastGroupBlock.id) + 1

        newBlocks = [...blocks.slice(0, insertIndex), block, ...blocks.slice(insertIndex)]

        newBlocks = newBlocks.map((b, index) => ({ ...b, order: index }))
      } else {
        newBlocks = [...blocks, block]
      }

      setBlocks(recalculateGroup(newBlocks, block.groupId))
    } else {
      newBlocks = [...blocks, block]
      setBlocks(newBlocks)
    }
  }

  const handleDeleteBlock = (blockId: string) => {
    const blockToDelete = blocks.find((b) => b.id === blockId)
    let newBlocks = blocks.filter((block) => block.id !== blockId)

    // Update order for all remaining blocks
    newBlocks = newBlocks.map((b, index) => ({ ...b, order: index }))

    if (blockToDelete && isGroupableBlock(blockToDelete)) {
      const updatedBlocks = recalculateGroup(newBlocks, blockToDelete.groupId)
      setBlocks(updatedBlocks)

      // If the deleted block was in the focused group and the group is now empty, clear focus
      const remainingGroupBlocks = updatedBlocks.filter(
        (b) => isGroupableBlock(b) && b.groupId === blockToDelete.groupId
      )
      if (focusedGroup === blockToDelete.groupId && remainingGroupBlocks.length === 0) {
        setFocusedGroup(null)
      }
    } else {
      setBlocks(newBlocks)
    }
  }

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
  }, [focusedGroup, blocks])

  const handleUpdateBlock = (blockId: string, updates: Partial<BlockType>) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          return { ...b, ...updates } as BlockType
        }
        return b
      })
    )
  }

  const renderBlockComponent = (block: BlockType) => {
    const blockElement = renderEditorBlock({
      block,
      onChange: (updates) => handleUpdateBlock(block.id, updates),
      onAddBlock: (blockType: BlockTypeEnum, groupId?: string) =>
        handleAddBlock(blockType, groupId),
      focusedGroup,
    })

    if (!blockElement) {
      return null
    }

    const wrapperProps = {
      blockId: block.id,
      onDelete: () => handleDeleteBlock(block.id),
      ...(isGroupableBlock(block) && {
        isLast: block.isLast,
        groupId: block.groupId,
      }),
    }

    return (
      <BlockWrapper key={block.id} {...wrapperProps}>
        {blockElement}
      </BlockWrapper>
    )
  }

  return (
    <div ref={editorRef} className={styles.editor}>
      <EditableText value={name} onChange={handleUpdateName} tag="h1" editable={true} />
      <div className={styles.blocksContainer}>{blocks.map(renderBlockComponent)}</div>
      <Search onAddBlock={handleAddBlock} />
      <Button label="Submit" onClick={() => console.log('Button clicked')} />
    </div>
  )
}
