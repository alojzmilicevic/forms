import { BlockWrapper } from "@/blocks/block-wrapper/block-wrapper";
import { Button } from "@/components/button/button";
import { renderEditorBlock, createBlock } from "@/blocks/block-factory";
import { Search } from "./search/search";
import type { Block as BlockType, BlockType as BlockTypeEnum } from "@/manifest.type";

type EditorProps = {
    blocks: BlockType[];
    setBlocks: (blocks: BlockType[]) => void;
}

export const Editor = ({ blocks, setBlocks }: EditorProps) => {
    const handleAddBlock = (blockType: BlockTypeEnum) => {
        const block = createBlock(blockType, blocks.length)
        setBlocks([...blocks, block])
      }
    
      const handleDeleteBlock = (blockId: string) => {
        setBlocks(blocks.filter(block => block.id !== blockId))
      }
    
      const handleUpdateBlock = (blockId: string, updates: Partial<BlockType>) => {
        setBlocks(blocks.map(b => {
          if (b.id === blockId) {
            return { ...b, ...updates } as BlockType
          }
          return b
        }))
      }
    
      const renderBlockComponent = (block: BlockType) => {
        const blockElement = renderEditorBlock({
          block,
          onUpdate: (updates) => handleUpdateBlock(block.id, updates)
        })
    
        if (!blockElement) {
          return null
        }
    
        return (
          <BlockWrapper 
            key={block.id} 
            onDelete={() => handleDeleteBlock(block.id)}
          >
            {blockElement}
          </BlockWrapper>
        )
      }
      
    return (
        <>
            <h1>Forms App</h1>
            {blocks.map(renderBlockComponent)}
            <Search onAddBlock={handleAddBlock} />
            <Button label="Submit" onClick={() => console.log('Button clicked')} />
        </>
    )
}
