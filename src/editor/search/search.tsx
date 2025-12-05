import { useState, useRef } from 'react'
import TextInput from '@/blocks/components/text-input/text-input'
import { Popover } from '@/components/popover/popover'
import styles from './search.module.scss'
import type { BlockType } from '@/manifest.type'
import { BLOCK_TYPES } from '@/manifest.type'

const ALL_BLOCK_TYPES: BlockType[] = Array.from(BLOCK_TYPES)

type SearchProps = {
  onAddBlock: (blockType: BlockType) => void
}

export const Search = ({ onAddBlock }: SearchProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [popoverPosition, setPopoverPosition] = useState<
    { top: number; left: number } | undefined
  >()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter block types based on search query
  const filteredBlockTypes = searchQuery
    ? ALL_BLOCK_TYPES.filter((type) =>
        type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ALL_BLOCK_TYPES

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const value = input.value

    // Check if there's a `/` in the value
    const slashIndex = value.lastIndexOf('/')

    if (slashIndex !== -1) {
      // Extract search query after the `/`
      const query = value.slice(slashIndex + 1)
      setSearchQuery(query)

      if (!isPopoverOpen && containerRef.current) {
        const rect = input.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        setPopoverPosition({
          top: rect.bottom - containerRect.top + 4,
          left: rect.left - containerRect.left,
        })
        setIsPopoverOpen(true)
        inputRef.current = input
      }
    } else {
      // No slash, close popover
      setIsPopoverOpen(false)
      setSearchQuery('')
    }
  }

  const handleSelect = (blockType: BlockType) => {
    onAddBlock(blockType)

    // Clear the input and close popover
    if (inputRef.current) {
      inputRef.current.value = ''
      setIsPopoverOpen(false)
      setSearchQuery('')
      inputRef.current.focus()
    }
  }

  const handleClose = () => {
    setIsPopoverOpen(false)
    setSearchQuery('')
  }

  return (
    <div ref={containerRef} className={styles.search}>
      <TextInput
        onChange={handleChange}
        placeholder="Type '/' to insert blocks"
        variant="standard"
        id="search-input-text"
      />
      <Popover
        isOpen={isPopoverOpen}
        onClose={handleClose}
        onSelect={handleSelect}
        items={filteredBlockTypes}
        position={popoverPosition}
      />
    </div>
  )
}
