import styles from './color.module.scss'

type ColorProps = {
  color?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Color = ({ onChange, color = '#000000' }: ColorProps) => {
  return (
    <div className={styles.colorPicker}>
      <div className={styles.swatch} style={{ backgroundColor: color }}>
        <input
          className={styles.input}
          type="color"
          onChange={onChange}
          readOnly={!onChange}
          value={color}
        />
      </div>
      <span className={styles.value}>{color.toUpperCase()}</span>
    </div>
  )
}
