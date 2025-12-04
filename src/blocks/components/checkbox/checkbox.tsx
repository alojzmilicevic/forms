import styles from './checkbox.module.scss'
import { CheckIcon } from '@/icons'

type CheckboxProps = {
  id: string
  checked: boolean
  label?: string
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const Checkbox = (props: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e.target.checked)
  }

  return (
    <div className={styles.checkboxWrapper}>
      <div className={`${styles.checkbox} ${props.disabled ? styles.disabled : ''}`}>
        <input
          type="checkbox"
          defaultChecked={props.checked}
          onChange={handleChange}
          disabled={props.disabled}
          id={props.id}
          className={styles.checkboxInput}
        />
        <CheckIcon />
      </div>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
    </div>
  )
}

export default Checkbox
