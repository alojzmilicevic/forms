import React from 'react'
import type {
  Block,
  BlockType,
  DividerBlock,
  NumberInputBlock,
  TextBlock,
  TextInputBlock,
} from '@/manifest.type'
import TextInput from './components/text-input/text-input'
import Divider from './components/divider/divider'
import { EditableText } from './components/editable-text/editable-text'
import { getBlockIcon } from '@/icons/blockIconMap'

// Block categories for shared logic
const INPUT_BLOCKS = ['textinput', 'number'] as const
const TEXT_BLOCKS = ['h1', 'h2', 'h3', 'text'] as const

// Blocks that are fully implemented
export const IMPLEMENTED_BLOCKS: readonly BlockType[] = [
  'textinput',
  'number',
  'divider',
  'h1',
  'h2',
  'h3',
  'text',
] as const

export const isBlockImplemented = (type: BlockType): boolean => IMPLEMENTED_BLOCKS.includes(type)

type InputBlockType = (typeof INPUT_BLOCKS)[number]
type TextBlockType = (typeof TEXT_BLOCKS)[number]

const isInputBlock = (type: BlockType): type is InputBlockType =>
  INPUT_BLOCKS.includes(type as InputBlockType)

const isTextBlock = (type: BlockType): type is TextBlockType =>
  TEXT_BLOCKS.includes(type as TextBlockType)

export const createBlock = (blockType: BlockType, order: number): Block => {
  const baseBlock = {
    id: crypto.randomUUID(),
    order,
  }

  switch (blockType) {
    case 'textinput': {
      const textInputBlock: TextInputBlock = {
        ...baseBlock,
        type: 'textinput',
        placeholder: '',
        maxLength: 255,
        minLength: 0,
        required: false,
      }
      return textInputBlock
    }
    case 'divider': {
      const dividerBlock: DividerBlock = {
        ...baseBlock,
        type: 'divider',
        orientation: 'horizontal',
      }
      return dividerBlock
    }
    case 'number': {
      const numberBlock: NumberInputBlock = {
        ...baseBlock,
        type: 'number',
        placeholder: '',
        max: 20,
        min: 0,
        required: false,
      }
      return numberBlock
    }
    case 'h1':
    case 'h2':
    case 'h3':
    case 'text':
      const textBlock: TextBlock = {
        ...baseBlock,
        type: blockType,
        value: blockType,
      }
      return textBlock
    default:
      throw new Error(`Unknown block type: ${blockType}`)
  }
}

type RenderBlockProps = {
  block: Block
  onUpdate: (updates: Partial<Block>) => void
}

export const renderEditorBlock = ({
  block,
  onUpdate,
}: RenderBlockProps): React.ReactElement | null => {
  const { type, id, order, ...blockProps } = block
  const Icon = getBlockIcon(type)

  // Input blocks (textinput, number) - edit placeholder field
  if (isInputBlock(type)) {
    const { placeholder, ...inputProps } = blockProps as Omit<
      TextInputBlock | NumberInputBlock,
      'type' | 'id' | 'order'
    >
    return React.createElement(TextInput, {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onUpdate({ placeholder: e.target.value } as Partial<Block>),
      placeholder: 'Type placeholder text',
      variant: 'outlined',
      value: placeholder || '',
      ...inputProps,
      endIcon: React.createElement(Icon),
    })
  }

  if (isTextBlock(type)) {
    const { value } = blockProps as Omit<TextBlock, 'type' | 'id' | 'order'>
    return React.createElement(EditableText, {
      value: value || '',
      onChange: (newValue: string) => onUpdate({ value: newValue } as Partial<Block>),
      placeholder: getTextPlaceholder(type),
      tag: type === 'text' ? 'p' : type,
      editable: true,
    })
  }

  // Other blocks
  switch (type) {
    case 'divider':
      return React.createElement(Divider)
    default:
      return null
  }
}

export const renderPreviewBlock = ({ block }: RenderBlockProps) => {
  const { type, id, order, ...blockProps } = block

  // Input blocks - render as TextInput
  if (isInputBlock(type)) {
    const inputProps = blockProps as Omit<
      TextInputBlock | NumberInputBlock,
      'type' | 'id' | 'order'
    >
    return React.createElement(TextInput, {
      variant: 'outlined',
      type: getInputType(type),
      ...inputProps,
    })
  }

  // Text blocks - render as static elements
  if (isTextBlock(type)) {
    const { value } = blockProps as Omit<TextBlock, 'type' | 'id' | 'order'>
    return React.createElement(EditableText, {
      value: value || '',
      onChange: () => {},
      tag: type === 'text' ? 'p' : type,
      editable: false,
    })
  }

  // Other blocks
  switch (type) {
    case 'divider':
      return React.createElement(Divider)
    default:
      return null
  }
}

const getInputType = (blockType: BlockType) => {
  switch (blockType) {
    case 'textinput':
      return 'text'
    case 'number':
      return 'number'
  }
}

const getTextPlaceholder = (blockType: TextBlockType) => {
  switch (blockType) {
    case 'h1':
      return 'Heading 1'
    case 'h2':
      return 'Heading 2'
    case 'h3':
      return 'Heading 3'
    case 'text':
      return 'Text'
  }
}
