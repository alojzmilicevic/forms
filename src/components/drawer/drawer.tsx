import { useEditorStore } from '@/store/editor-store'
import { ThemeCustomizer } from '@/components/theme-customizer/theme-customizer'
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
          <ThemeCustomizer />
        </div>
      </div>
    </>
  )
}
