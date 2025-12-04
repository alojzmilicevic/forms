import { useState } from 'react'
import type { Block, Manifest } from './manifest.type'
import styles from './styles/app.module.scss'
import { Editor } from './editor/editor'
import { Preview } from './preview/preview'
import { Toolbar } from './components/toolbar/toolbar'

function App() {
  const [manifest, setManifest] = useState<Manifest>({
    name: 'Title',
    description: '',
    blocks: [],
  })
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const setEditorMode = () => {
    setMode('edit')
  }

  const setPreviewMode = () => {
    setMode('preview')
  }

  const setBlocks = (blocks: Block[]) => {
    setManifest({ ...manifest, blocks })
  }

  const handleUpdateName = (name: string) => {
    setManifest({ ...manifest, name })
  }

  return (
    <div className={styles.outerContainer}>
      <Toolbar onPreviewClick={setPreviewMode} />

      <div className={styles.container}>
        <Editor manifest={manifest} setBlocks={setBlocks} handleUpdateName={handleUpdateName} />
        <Preview manifest={manifest} mode={mode} setEditorMode={setEditorMode} />
      </div>
    </div>
  )
}

export default App
