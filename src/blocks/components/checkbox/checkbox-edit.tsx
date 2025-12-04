import type { CheckboxBlock } from '@/manifest.type'
import Checkbox from './checkbox'
import TextInput from '../text-input/text-input'
import styles from './checkbox-edit.module.scss'

type CheckboxEditProps = CheckboxBlock & {
  onChange: (update: Partial<CheckboxBlock>) => void
  onAddBlock: (groupId: string) => void
  focusedGroup: string | null
}

const CheckboxEdit = ({
  id,
  checked,
  label,
  onChange,
  groupId,
  onAddBlock,
  isLast,
  groupIndex,
  focusedGroup,
}: CheckboxEditProps) => {
  const show = isLast && focusedGroup === groupId

  return (
    <div className={styles.checkboxEditWrapper}>
      <div className={styles.checkboxEdit}>
        <Checkbox id={id} checked={checked} label={undefined} disabled />
        <TextInput
          id={`text-input-${id}`}
          onChange={(e) => onChange({ label: e.target.value })}
          variant="standard"
          placeholder={`Option ${groupIndex + 1}`}
          value={label}
        />
        {show && <button onClick={() => onAddBlock(groupId)}>+</button>}
      </div>
    </div>
  )
}

export { CheckboxEdit }
