import type { ReactNode } from 'react'
import styles from './text-input.module.scss'

type TextInputProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  variant?: 'standard' | 'filled' | 'outlined'
  maxLength?: number
  minLength?: number
  max?: number
  min?: number
  required?: boolean
  value?: string
  type?: 'text' | 'number'
  endIcon?: ReactNode
}

const TextInput = (props: TextInputProps) => {
  const variant = props.variant || 'outlined'
  const readOnlyClass = !props.onChange ? styles['text-input-read-only'] : ''
  return (
    <div className={styles['text-input-wrapper']}>
      <input
        type={props.type || 'text'}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        className={`${styles['text-input']} ${styles[`text-input-${variant}`]} ${props.endIcon ? styles['text-input-with-icon'] : ''} ${readOnlyClass}`}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        required={props.required}
        value={props.value}
        min={props.min}
        max={props.max}
      />
      {props.endIcon && <div className={styles['text-input-end-icon']}>{props.endIcon}</div>}
    </div>
  )
}

export default TextInput
