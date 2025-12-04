import type { CheckboxBlock } from '@/manifest.type'
import Checkbox from './checkbox'
import TextInput from '../text-input/text-input'
import styles from './checkbox-edit.module.scss'

type CheckboxEditProps = CheckboxBlock & {
  onChange: (update: Partial<CheckboxBlock>) => void
  onFocus?: () => void
}

const CheckboxEdit = ({ id, checked, label, onChange }: CheckboxEditProps) => {
  return (
    <div className={styles.checkboxEditWrapper}>
      <div className={styles.checkboxEdit}>
        <Checkbox id={id} checked={checked} label={undefined} disabled />
        <TextInput
          id={`text-input-${id}`}
          onChange={(e) => onChange({ label: e.target.value })}
          variant="standard"
          placeholder="Option"
          value={label}
        />
      </div>
    </div>
  )
}

export { CheckboxEdit }
