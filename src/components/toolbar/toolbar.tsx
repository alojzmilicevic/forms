import { useEditorStore } from '@/store/editor-store'
import styles from './toolbar.module.scss'
import { Button } from '../button/button'

export const Toolbar = () => {
  const setMode = useEditorStore((state) => state.setMode)
  const toggleCustomizeDrawer = useEditorStore((state) => state.toggleCustomizeDrawer)
  const isDrawerOpen = useEditorStore((state) => state.customizeDrawerOpen)

  return (
    <div className={`${styles.toolbar} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
      <div className={styles.toolbarContent}>
        <div className={styles.toolbarLeft}></div>
        <div className={styles.toolbarRight}>
          <Button label="Customize" onClick={toggleCustomizeDrawer} variant="tertiary" />

          <Button label="Preview" onClick={() => setMode('preview')} variant="tertiary" />
        </div>
      </div>
    </div>
  )
}
