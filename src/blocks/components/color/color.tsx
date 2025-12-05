import { useState, useEffect } from 'react'
import { useDebouncedCallback } from '@/hooks/debounce.hook'
import styles from './color.module.scss'

type ColorProps = {
  color?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Color = ({ onChange, color = '#000000' }: ColorProps) => {
  const [localColor, setLocalColor] = useState(color)

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  const debounced = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
  }, 300)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    setLocalColor(newColor)
    debounced(event)
  }

  return (
    <div className={styles.colorPicker}>
      <div className={styles.swatch} style={{ backgroundColor: localColor }}>
        <input
          className={styles.input}
          type="color"
          onChange={handleChange}
          readOnly={!onChange}
          value={localColor}
        />
      </div>
      <span className={styles.value}>{localColor.toUpperCase()}</span>
    </div>
  )
}
