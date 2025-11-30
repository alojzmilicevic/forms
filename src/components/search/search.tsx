import { useState, useRef } from 'react'
import Textfield from "../textfield/textfield"
import { Popover } from '../popover/popover'
import { blockCategories } from '@/icons/blockCategories'
import styles from './search.module.scss'

const ALL_BLOCK_TYPES = Object.keys(blockCategories)

export const Search = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | undefined>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const value = input.value
    const lastChar = value[value.length - 1]

    if (lastChar === '/') {
      if (containerRef.current) {
        const rect = input.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        setPopoverPosition({
          top: rect.bottom - containerRect.top + 4,
          left: rect.left - containerRect.left,
        })
        setIsPopoverOpen(true)
        inputRef.current = input
      }
    } else if (isPopoverOpen && value.length > 0 && !value.includes('/')) {
      setIsPopoverOpen(false)
    }
  }

  const handleSelect = (blockType: string) => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value
      const newValue = currentValue.replace(/\/$/, blockType + ' ')
      inputRef.current.value = newValue
      setIsPopoverOpen(false)
      inputRef.current.focus()
    }
  }


  return (
    <div ref={containerRef} className={styles.search}>
      <Textfield
        onChange={handleChange}
        placeholder="Type '/' to insert blocks"
        variant="standard"
      />
      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        onSelect={handleSelect}
        items={ALL_BLOCK_TYPES}
        position={popoverPosition}
      />
    </div>
  )
}

