import type { CheckboxBlock } from '@/manifest.type'
import styles from './checkbox.module.scss'

type CheckboxProps = CheckboxBlock & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        readOnly={!props.onChange}
        id={props.id}
      />
    </div>
  )
}

export default Checkbox
