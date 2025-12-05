import styles from './styles/app.module.scss'
import { Editor } from './editor/editor'
import { Preview } from './preview/preview'
import { Toolbar } from './components/toolbar/toolbar'

function App() {
  return (
    <div className={styles.outerContainer}>
      <Toolbar />

      <div className={styles.container}>
        <Editor />
        <Preview />
      </div>
    </div>
  )
}

export default App
