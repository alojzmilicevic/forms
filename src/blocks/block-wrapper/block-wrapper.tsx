import type { ReactNode } from 'react'
import { MoveIcon } from '@/icons/MoveIcon'
import { DeleteIcon } from '@/icons/DeleteIcon'
import styles from './block-wrapper.module.scss'

type BlockWrapperProps = {
  children: ReactNode
  onDelete: () => void
}

export const BlockWrapper = ({ children, onDelete }: BlockWrapperProps) => {
  return (
    <div className={styles.block}>
      <div className={styles.content}>
        <div className={styles.hoverArea}>
          <div className={styles.controls}>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={onDelete}
              aria-label="Delete block"
            >
              <DeleteIcon className={styles.deleteIcon} />
            </button>
            <button className={styles.moveButton} type="button" aria-label="Move block">
              <MoveIcon className={styles.moveIcon} />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
