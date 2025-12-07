import classNames from 'classnames'
import styles from './styles/app.module.scss'
import { Editor } from './editor/editor'
import { Preview } from './preview/preview'
import { Toolbar } from './components/toolbar/toolbar'
import { Drawer } from './components/drawer/drawer'
import { useEditorStore } from './store/editor-store'

function App() {
  const isDrawerOpen = useEditorStore((state) => state.customizeDrawerOpen)
  const mode = useEditorStore((state) => state.mode)

  return (
    <div className={styles.appWrapper}>
      <div
        className={classNames(styles.mainContent, {
          [styles.drawerOpen]: isDrawerOpen,
          [styles.previewMode]: mode === 'preview',
        })}
      >
        <Toolbar />
        <div className={styles.outerContainer}>
          <div className={styles.container}>
            <Editor />
            <Preview />
          </div>
        </div>
      </div>
      <Drawer />
    </div>
  )
}

export default App
