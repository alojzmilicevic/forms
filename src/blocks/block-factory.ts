import React from 'react'
import type {
  Block,
  BlockType,
  ColorBlock,
  DividerBlock,
  NumberInputBlock,
  TextBlock,
  TextInputBlock,
} from '@/manifest.type'
import TextInput from './components/text-input/text-input'
import Divider from './components/divider/divider'
import { EditableText } from './components/editable-text/editable-text'
import { getBlockIcon } from '@/icons/blockIconMap'
import { Color } from './components/color/color'

// Blocks that are fully implemented
export const IMPLEMENTED_BLOCKS: readonly BlockType[] = [
  'textinput',
  'number',
  'divider',
  'h1',
  'h2',
  'h3',
  'text',
  'color',
] as const

export const isBlockImplemented = (type: BlockType): boolean => IMPLEMENTED_BLOCKS.includes(type)

type TextBlockType = 'h1' | 'h2' | 'h3' | 'text'

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
    case 'text': {
      const textBlock: TextBlock = {
        ...baseBlock,
        type: blockType,
        value: blockType,
      }
      return textBlock
    }
    case 'color': {
      const colorBlock: ColorBlock = {
        ...baseBlock,
        type: 'color',
        color: '#000000',
      }
      return colorBlock
    }
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
  const { type, ...blockProps } = block
  const Icon = getBlockIcon(type)

  switch (type) {
    case 'textinput':
    case 'number': {
      const { placeholder, ...inputProps } = blockProps as Omit<
        TextInputBlock | NumberInputBlock,
        'type'
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
    case 'h1':
    case 'h2':
    case 'h3':
    case 'text': {
      const { value } = blockProps as Omit<TextBlock, 'type'>
      return React.createElement(EditableText, {
        value: value || '',
        onChange: (newValue: string) => onUpdate({ value: newValue } as Partial<Block>),
        placeholder: getTextPlaceholder(type),
        tag: type === 'text' ? 'p' : type,
        editable: true,
      })
    }
    case 'divider':
      return React.createElement(Divider)
    case 'color':
      const { color } = blockProps as ColorBlock
      return React.createElement(Color, {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          onUpdate({ color: e.target.value } as ColorBlock),
        value: color,
      })
    default:
      return null
  }
}

export const renderPreviewBlock = ({ block }: { block: Block }) => {
  const { type, ...blockProps } = block

  switch (type) {
    case 'textinput':
    case 'number': {
      const inputProps = blockProps as Omit<TextInputBlock | NumberInputBlock, 'type'>
      return React.createElement(TextInput, {
        variant: 'outlined',
        type: getInputType(type),
        ...inputProps,
      })
    }
    case 'h1':
    case 'h2':
    case 'h3':
    case 'text': {
      const { value } = blockProps as TextBlock
      return React.createElement(EditableText, {
        value: value || '',
        onChange: () => {},
        tag: type === 'text' ? 'p' : type,
        editable: false,
      })
    }
    case 'divider':
      return React.createElement(Divider)
    case 'color':
      const { color } = blockProps as ColorBlock
      return React.createElement(Color, {
        value: color,
      })
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
