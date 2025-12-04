import type { Manifest } from '@/manifest.type'
import styles from './preview.module.scss'
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon'
import { renderPreviewBlock } from '@/blocks/block-factory'

type PreviewProps = {
  manifest: Manifest
  mode: 'edit' | 'preview'
  setEditorMode: () => void
}

const ReturnButton = ({ setEditorMode }: { setEditorMode: () => void }) => {
  return (
    <div className={styles.returnButtonContainer}>
      <button className={styles.returnButton} onClick={setEditorMode}>
        <ChevronLeftIcon />
        Back to editor
      </button>
    </div>
  )
}

export const Preview = ({ manifest, mode, setEditorMode }: PreviewProps) => {
  const { blocks, name } = manifest

  if (mode !== 'preview') return null

  return (
    <div className={styles.preview}>
      <ReturnButton setEditorMode={setEditorMode} />
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
