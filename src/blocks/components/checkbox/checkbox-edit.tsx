import type { CheckboxBlock } from '@/manifest.type'
import Checkbox from './checkbox'
import TextInput from '../text-input/text-input'
import { useEditorStore } from '@/store/editor-store'
import styles from './checkbox-edit.module.scss'

type CheckboxEditProps = CheckboxBlock

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.addButtonWrapper}>
      <Checkbox id={'new-checkbox-option'} checked={false} label={undefined} disabled />
      <button onClick={onClick} className={styles.addButton}>
        Add option
      </button>
    </div>
  )
}

const CheckboxEdit = ({ id, checked, label, groupId, isLast, groupIndex }: CheckboxEditProps) => {
  const focusedGroup = useEditorStore((state) => state.focusedGroup)
  const updateBlock = useEditorStore((state) => state.updateBlock)
  const addBlock = useEditorStore((state) => state.addBlock)

  const show = isLast && focusedGroup === groupId

  const handleChange = (updates: Partial<CheckboxBlock>) => {
    updateBlock(id, updates)
  }

  return (
    <div className={styles.checkboxEditWrapper}>
      <div className={styles.checkboxEdit}>
        <Checkbox id={id} checked={checked} label={undefined} disabled />
        <TextInput
          id={`text-input-${id}`}
          onChange={(e) => handleChange({ label: e.target.value })}
          variant="standard"
          placeholder={`Option ${groupIndex + 1}`}
          value={label}
        />
      </div>
      {show && <AddButton onClick={() => addBlock('checkbox', groupId)} />}
    </div>
  )
}

export { CheckboxEdit }
