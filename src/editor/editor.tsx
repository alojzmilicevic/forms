import { BlockWrapper } from '@/blocks/block-wrapper/block-wrapper'
import { Button } from '@/components/button/button'
import { renderEditorBlock, createBlock } from '@/blocks/block-factory'
import { Search } from './search/search'
import type { Block as BlockType, BlockType as BlockTypeEnum, Manifest } from '@/manifest.type'
import { EditableText } from '@/blocks/components/editable-text/editable-text'

type EditorProps = {
  manifest: Manifest
  setBlocks: (blocks: BlockType[]) => void
  handleUpdateName: (name: string) => void
}

export const Editor = ({ manifest, setBlocks, handleUpdateName }: EditorProps) => {
  const { blocks, name } = manifest

  const handleAddBlock = (blockType: BlockTypeEnum) => {
    const block = createBlock(blockType, blocks.length)
    setBlocks([...blocks, block])
  }

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId))
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
    })

    if (!blockElement) {
      return null
    }

    return (
      <BlockWrapper key={block.id} onDelete={() => handleDeleteBlock(block.id)}>
        {blockElement}
      </BlockWrapper>
    )
  }

  return (
    <>
      <EditableText value={name} onChange={handleUpdateName} tag="h1" editable={true} />
      {blocks.map(renderBlockComponent)}
      <Search onAddBlock={handleAddBlock} />
      <Button label="Submit" onClick={() => console.log('Button clicked')} />
    </>
  )
}
