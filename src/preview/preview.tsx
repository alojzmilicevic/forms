import styles from './preview.module.scss'
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon'
import { renderPreviewBlock } from '@/blocks/block-factory'
import { useEditorStore } from '@/store/editor-store'

const ReturnButton = () => {
  const setMode = useEditorStore((state) => state.setMode)

  return (
    <div className={styles.returnButtonContainer}>
      <button className={styles.returnButton} onClick={() => setMode('edit')}>
        <ChevronLeftIcon />
        Back to editor
      </button>
    </div>
  )
}

export const Preview = () => {
  const blocks = useEditorStore((state) => state.manifest.blocks)
  const name = useEditorStore((state) => state.manifest.name)
  const mode = useEditorStore((state) => state.mode)

  if (mode !== 'preview') return null

  return (
    <div className={styles.preview}>
      <ReturnButton />
      <div className={styles.previewContainer}>
        <div className={styles.previewContent}>
          <h1>{name}</h1>
          {blocks.map((block) => (
            <div key={block.id}>{renderPreviewBlock({ block })}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
