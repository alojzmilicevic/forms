import { useState } from 'react'
import type { Block } from './manifest.type'
import styles from './styles/app.module.scss'
import { Editor } from './editor/editor'
import { Preview } from './preview/preview'
import { Toolbar } from './components/toolbar/toolbar'


function App() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [mode, setMode] = useState<'edit' | 'preview'>('preview')

  const setEditorMode = () => {
    setMode('edit')
  }

  const setPreviewMode = () => {
    setMode('preview')
  }
  
  return (
    <div className={styles.outerContainer}>
      <Toolbar onPreviewClick={setPreviewMode} />

      <div className={styles.container}>
        <Editor blocks={blocks} setBlocks={setBlocks} />
        <Preview blocks={blocks} mode={mode} setEditorMode={setEditorMode} />
      </div>
    </div>
  )
}

export default App
