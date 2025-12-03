import styles from './color.module.scss'

type ColorProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const Color = ({ onChange, value = '#000000' }: ColorProps) => {
  return (
    <div className={styles.colorPicker}>
      <div className={styles.swatch} style={{ backgroundColor: value }}>
        <input
          className={styles.input}
          type="color"
          onChange={onChange}
          value={value}
        />
      </div>
      <span className={styles.value}>{value.toUpperCase()}</span>
    </div>
  )
}
