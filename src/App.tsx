import { Button } from './components/button/button'
import { Search } from './components/search/search'
import styles from './styles/app.module.scss'

function App() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h1>Forms App</h1>
        <Search />

        <Button label="Submit" onClick={() => console.log('Button clicked')} />
      </div>
    </div>
  )
}

export default App
