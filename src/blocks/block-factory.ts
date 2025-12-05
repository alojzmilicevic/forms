import React from 'react'
import type { Block, BlockType } from '@/manifest.type'
import TextInput from './components/text-input/text-input'
import Divider from './components/divider/divider'
import { EditableText } from './components/editable-text/editable-text'
import { getBlockIcon } from '@/icons/blockIconMap'
import { Color } from './components/color/color'
import Checkbox from './components/checkbox/checkbox'
import { CheckboxEdit } from './components/checkbox/checkbox-edit'
import { useEditorStore } from '@/store/editor-store'

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

export const renderEditorBlock = (block: Block): React.ReactElement | null => {
  const updateBlock = useEditorStore.getState().updateBlock

  const onChange = (updates: Partial<Block>) => updateBlock(block.id, updates)

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
