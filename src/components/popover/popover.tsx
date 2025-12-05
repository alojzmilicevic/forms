import { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/click-outside.hook'
import { useKeyPress } from '@/hooks/key-press.hook'
import { getBlockIcon } from '@/icons/blockIconMap'
import { blockCategories, categoryLabels, type BlockCategory } from '@/icons/blockCategories'
import { isBlockImplemented } from '@/blocks/block-factory'
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

const PopoverContent = ({ onClose, onSelect, items, position }: Omit<PopoverProps, 'isOpen'>) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Group items by category - React Compiler will memoize this
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

  const groupedItems = flatList

  // Get only selectable items (blocks, not categories) for navigation
  const selectableItems = groupedItems.filter((item) => item.type === 'block') as Array<{
    type: 'block'
    blockType: BlockType
  }>

  useClickOutside(popoverRef, {
    enabled: true,
    handler: onClose,
  })

  useKeyPress({
    keys: ['Escape'],
    disabled: false,
    onKeyDown: () => onClose(),
  })

  useKeyPress({
    keys: ['ArrowDown'],
    disabled: false,
    onKeyDown: (e) => {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < selectableItems.length - 1 ? prev + 1 : 0))
    },
  })

  useKeyPress({
    keys: ['ArrowUp'],
    disabled: false,
    onKeyDown: (e) => {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : selectableItems.length - 1))
    },
  })

  useKeyPress({
    keys: ['Enter'],
    disabled: false,
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
        (item) =>
          item.type === 'block' && item.blockType === selectableItems[selectedIndex].blockType
      )
    }
    return -1
  }

  const selectedBlockIndex = getSelectedBlockIndex()

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
          const isImplemented = isBlockImplemented(item.blockType!)

          return (
            <li
              key={item.blockType}
              className={`${styles.item} ${isSelected ? styles.highlighted : ''} ${!isImplemented ? styles.unimplemented : ''}`}
              onClick={() => isImplemented && onSelect(item.blockType!)}
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

export const Popover = ({ isOpen, onClose, onSelect, items, position }: PopoverProps) => {
  if (!isOpen) return null

  return <PopoverContent onClose={onClose} onSelect={onSelect} items={items} position={position} />
}
