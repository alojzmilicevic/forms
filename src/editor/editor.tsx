import { BlockWrapper } from '@/blocks/block-wrapper/block-wrapper'
import { Button } from '@/components/button/button'
import { renderEditorBlock } from '@/blocks/block-factory'
import { Search } from './search/search'
import type { Block as BlockType } from '@/manifest.type'
import { isGroupableBlock } from '@/manifest.type'
import { EditableText } from '@/blocks/components/editable-text/editable-text'
import { useRef, useEffect } from 'react'
import { useEditorStore } from '@/store/editor-store'
import styles from './editor.module.scss'

export const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  const blocks = useEditorStore((state) => state.manifest.blocks)
  const name = useEditorStore((state) => state.manifest.name)
  const focusedGroup = useEditorStore((state) => state.focusedGroup)
  const setFocusedGroup = useEditorStore((state) => state.setFocusedGroup)
  const addBlock = useEditorStore((state) => state.addBlock)
  const deleteBlock = useEditorStore((state) => state.deleteBlock)
  const updateName = useEditorStore((state) => state.updateName)

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

  const renderBlockComponent = (block: BlockType) => {
    const blockElement = renderEditorBlock(block)

    if (!blockElement) {
      return null
    }

    const wrapperProps = {
      blockId: block.id,
      onDelete: () => deleteBlock(block.id),
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
      <EditableText value={name} onChange={updateName} tag="h1" editable={true} />
      <div className={styles.blocksContainer}>{blocks.map(renderBlockComponent)}</div>
      <Search onAddBlock={addBlock} />
      <Button label="Submit" onClick={() => console.log('Button clicked')} />
    </div>
  )
}
