import React from 'react'
import type {
  Block,
  BlockType,
  CheckboxBlock,
  ColorBlock,
  DividerBlock,
  NumberInputBlock,
  TextInputBlock,
} from '@/manifest.type'
import TextInput from './components/text-input/text-input'
import Divider from './components/divider/divider'
import { EditableText } from './components/editable-text/editable-text'
import { getBlockIcon } from '@/icons/blockIconMap'
import { Color } from './components/color/color'
import Checkbox from './components/checkbox/checkbox'
import { CheckboxEdit } from './components/checkbox/checkbox-edit'

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
  'checkbox',
] as const

export const isBlockImplemented = (type: BlockType): boolean => IMPLEMENTED_BLOCKS.includes(type)

type TextBlockType = 'h1' | 'h2' | 'h3' | 'text'

export const createBlock = (blockType: BlockType, blocks: Block[], groupId?: string): Block => {
  const baseBlock = {
    id: crypto.randomUUID(),
    order: blocks.length,
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
      return { ...baseBlock, type: 'h1', value: 'Heading 1' } as const
    case 'h2':
      return { ...baseBlock, type: 'h2', value: 'Heading 2' } as const
    case 'h3':
      return { ...baseBlock, type: 'h3', value: 'Heading 3' } as const
    case 'text':
      return { ...baseBlock, type: 'text', value: '' } as const
    case 'color': {
      const colorBlock: ColorBlock = {
        ...baseBlock,
        type: 'color',
        color: '#000000',
      }
      return colorBlock
    }
    case 'checkbox': {
      const gId = groupId || crypto.randomUUID()
      const gIndex = groupId
        ? blocks.filter((b) => b.type === 'checkbox' && b.groupId === groupId).length
        : 0

      const checkboxBlock: CheckboxBlock = {
        ...baseBlock,
        type: 'checkbox',
        checked: false,
        label: '',
        groupId: gId,
        groupIndex: gIndex,
        isLast:
          gIndex === blocks.filter((b) => b.type === 'checkbox' && b.groupId === groupId).length,
        isFirst: gIndex === 0,
      }
      return checkboxBlock
    }
    default:
      throw new Error(`Unknown block type: ${blockType}`)
  }
}

type RenderBlockProps = {
  block: Block
  onChange: (updates: Partial<Block>) => void
  onAddBlock: (blockType: BlockType, groupId?: string) => void
  focusedGroup: string | null
}

export const renderEditorBlock = ({
  block,
  onChange,
  onAddBlock,
  focusedGroup,
}: RenderBlockProps): React.ReactElement | null => {
  switch (block.type) {
    case 'textinput':
    case 'number': {
      return React.createElement(TextInput, {
        id: block.id,
        onChange: (e) => onChange({ placeholder: e.target.value }),
        placeholder: 'Type placeholder text',
        variant: 'outlined',
        value: block.placeholder || '',
        endIcon: React.createElement(getBlockIcon(block.type)),
      })
    }
    case 'h1':
    case 'h2':
    case 'h3':
    case 'text': {
      return React.createElement(EditableText, {
        value: block.value || '',
        onChange: (value) => onChange({ value }),
        placeholder: getTextPlaceholder(block.type),
        tag: block.type === 'text' ? 'p' : block.type,
        editable: true,
      })
    }
    case 'divider':
      return React.createElement(Divider)
    case 'color': {
      return React.createElement(Color, {
        color: block.color,
        onChange: (e) => onChange({ color: e.target.value }),
      })
    }
    case 'checkbox': {
      return React.createElement(CheckboxEdit, {
        ...block,
        onChange: (updates) => onChange(updates),
        onAddBlock: (groupId: string) => onAddBlock('checkbox', groupId),
        focusedGroup,
      })
    }
    default:
      return null
  }
}

export const renderPreviewBlock = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'textinput':
    case 'number': {
      return React.createElement(TextInput, {
        id: block.id,
        variant: 'outlined',
        type: getInputType(block.type),
        placeholder: block.placeholder,
      })
    }
    case 'h1':
    case 'h2':
    case 'h3':
    case 'text': {
      return React.createElement(EditableText, {
        value: block.value || '',
        onChange: () => {},
        tag: block.type === 'text' ? 'p' : block.type,
        editable: false,
      })
    }
    case 'divider':
      return React.createElement(Divider)
    case 'color': {
      return React.createElement(Color, {
        color: block.color,
      })
    }
    case 'checkbox': {
      return React.createElement(Checkbox, {
        ...block,
      })
    }
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
