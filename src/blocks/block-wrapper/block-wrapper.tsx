import type { ReactNode } from 'react'
import { DragIcon } from '@/icons/DragIcon'
import { DeleteIcon } from '@/icons/DeleteIcon'
import styles from './block-wrapper.module.scss'

type BlockWrapperProps = {
  children: ReactNode
  onDelete: () => void
  blockId: string
  isLast?: boolean
  groupId?: string
}

export const BlockWrapper = ({
  children,
  onDelete,
  blockId,
  isLast,
  groupId,
}: BlockWrapperProps) => {
  const blockClass = [styles.block, groupId && !isLast ? '' : styles.marginBottom]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={blockClass} data-block-id={blockId}>
      <div className={styles.content}>
        <div className={styles.hoverArea}>
          <div className={styles.controls}>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={onDelete}
              aria-label="Delete block"
            >
              <DeleteIcon />
            </button>
            <button className={styles.moveButton} type="button" aria-label="Move block">
              <DragIcon />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
