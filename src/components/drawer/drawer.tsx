import { useEditorStore } from '@/store/editor-store'
import styles from './drawer.module.scss'

export const Drawer = () => {
  const isOpen = useEditorStore((state) => state.customizeDrawerOpen)
  const toggleDrawer = useEditorStore((state) => state.toggleCustomizeDrawer)

  return (
    <>
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <p>Customize</p>
          <button className={styles.closeButton} onClick={toggleDrawer}>
            ✕
          </button>
        </div>
        <div className={styles.drawerContent}>
          <p>Drawer content will go here</p>
        </div>
      </div>
    </>
  )
}
