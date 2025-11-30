import { useState } from 'react'
import { Button } from './components/button/button'
import Divider from './components/divider/divider'
import { Search } from './components/search/search'
import Textfield from './components/textfield/textfield'
import { Block } from './components/block/block'
import type { Block as BlockType } from './manifest.type'
import styles from './styles/app.module.scss'

function App() {
  const [blocks, setBlocks] = useState<BlockType[]>([])

  const handleAddBlock = (block: BlockType) => {
    setBlocks([...blocks, block])
  }

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId))
  }

  const renderBlock = (block: BlockType) => {
    const blockType = block.type as string
    let blockElement: React.ReactElement | null = null

    switch (blockType) {
      case 'divider':
        blockElement = <Divider />
        break
      case 'textfield':
      case 'textinput':
        blockElement = (
          <Textfield
            onChange={() => {}}
            placeholder="Enter text"
            variant="outlined"
          />
        )
        break
      default:
        return null
    }

    return (
      <Block key={block.id} onDelete={() => handleDeleteBlock(block.id)}>
        {blockElement}
      </Block>
    )
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h1>Forms App</h1>
        {blocks.map(renderBlock)}
        <Search onAddBlock={handleAddBlock} />
        <Button label="Submit" onClick={() => console.log('Button clicked')} />
      </div>
    </div>
  )
}

export default App
