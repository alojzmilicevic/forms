import { useRef, useState, useEffect, useMemo } from 'react'
import { useClickOutside } from '@/hooks/click-outside.hook'
import { useKeyPress } from '@/hooks/key-press.hook'
import { getBlockIcon } from '@/icons/blockIconMap'
import { blockCategories, categoryLabels, type BlockCategory } from '@/icons/blockCategories'
import styles from './popover.module.scss'
import type { BlockType } from '@/manifest.type'

type PopoverItem = {
  type: 'block' | 'category'
  blockType?: BlockType
  category?: BlockCategory
}

type PopoverProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (blockType: BlockType) => void
  items: BlockType[]
  position?: { top: number; left: number }
}

export const Popover = ({ isOpen, onClose, onSelect, items, position }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Group items by category and create flat list with category headers
  const groupedItems = useMemo(() => {
    const grouped: Record<BlockCategory, BlockType[]> = {
      layout: [],
      input: [],
    }

    items.forEach((item) => {
      const category = blockCategories[item] || 'input'
      grouped[category].push(item)
    })

    const flatList: PopoverItem[] = []
    const categoryOrder: BlockCategory[] = ['layout', 'input']

    categoryOrder.forEach((category) => {
      if (grouped[category].length > 0) {
        flatList.push({ type: 'category', category })
        grouped[category].forEach((blockType) => {
          flatList.push({ type: 'block', blockType })
        })
      }
    })

    return flatList
  }, [items])

  // Get only selectable items (blocks, not categories) for navigation
  const selectableItems = useMemo(() => {
    return groupedItems.filter((item) => item.type === 'block') as Array<{ type: 'block'; blockType: BlockType }>
  }, [groupedItems])

  // Reset selected index when popover opens
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0)
    }
  }, [isOpen])

  useClickOutside(popoverRef, {
    enabled: isOpen,
    handler: onClose,
  })

  useKeyPress({
    keys: ['Escape'],
    disabled: !isOpen,
    onKeyDown: () => onClose(),
  })

  useKeyPress({
    keys: ['ArrowDown'],
    disabled: !isOpen,
    onKeyDown: (e) => {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < selectableItems.length - 1 ? prev + 1 : 0))
    },
  })

  useKeyPress({
    keys: ['ArrowUp'],
    disabled: !isOpen,
    onKeyDown: (e) => {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : selectableItems.length - 1))
    },
  })

  useKeyPress({
    keys: ['Enter'],
    disabled: !isOpen,
    onKeyDown: (e) => {
      e.preventDefault()
      if (selectableItems[selectedIndex]?.blockType) {
        onSelect(selectableItems[selectedIndex].blockType)
      }
    },
  })

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Find the index in groupedItems for the selected block
  const getSelectedBlockIndex = () => {
    if (selectableItems[selectedIndex]) {
      return groupedItems.findIndex(
        (item) => item.type === 'block' && item.blockType === selectableItems[selectedIndex].blockType
      )
    }
    return -1
  }

  const selectedBlockIndex = getSelectedBlockIndex()

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      className={styles.popover}
      style={{
        top: position?.top,
        left: position?.left,
      }}
    >
      <ul className={styles.list}>
        {groupedItems.map((item, index) => {
          if (item.type === 'category') {
            return (
              <li key={`category-${item.category}`} className={styles.categoryHeader}>
                {categoryLabels[item.category!]}
              </li>
            )
          }

          const Icon = getBlockIcon(item.blockType!)
          const isSelected = index === selectedBlockIndex

          return (
            <li
              key={item.blockType}
              className={`${styles.item} ${isSelected ? styles.highlighted : ''}`}
              onClick={() => onSelect(item.blockType!)}
            >
              <Icon className={styles.icon} />
              <span>{capitalizeFirst(item.blockType!)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

