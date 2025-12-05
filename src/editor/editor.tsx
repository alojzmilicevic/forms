import { BlockWrapper } from '@/blocks/block-wrapper/block-wrapper'
import { Button } from '@/components/button/button'
import { renderEditorBlock, createBlock } from '@/blocks/block-factory'
import { Search } from './search/search'
import type { Block as BlockType, BlockType as BlockTypeEnum, Manifest } from '@/manifest.type'
import { isGroupableBlock } from '@/manifest.type'
import { EditableText } from '@/blocks/components/editable-text/editable-text'
import { useRef } from 'react'
import { useGroupFocus } from '@/hooks/use-group-focus.hook'
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
  const editorRef = useRef<HTMLDivElement>(null)
  const { focusedGroup, setFocusedGroup } = useGroupFocus(editorRef, blocks)

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
