import { useEditorStore } from '@/store/editor-store'
import styles from './toolbar.module.scss'

export const Toolbar = () => {
  const setMode = useEditorStore((state) => state.setMode)

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarContent}>
        <div className={styles.toolbarLeft}></div>
        <div className={styles.toolbarRight}>
          <button onClick={() => setMode('preview')}>Preview</button>
        </div>
      </div>
    </div>
  )
}
