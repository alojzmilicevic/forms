type Manifest = {
  name: string
  description: string
  blocks: Block[]
}

type BaseBlock = {
  id: string
  order: number
}

type Block =
  | TextInputBlock
  | DividerBlock
  | NumberInputBlock
  | H1Block
  | H2Block
  | H3Block
  | TextBlock
  | ColorBlock
  | DateBlock
  | ImageUploadBlock
  | SelectBlock
  | CheckboxBlock

type TextInputBlock = BaseBlock & {
  type: 'textinput'
  placeholder: string
  maxLength: number
  minLength: number
  required: boolean
}

type DividerBlock = BaseBlock & {
  type: 'divider'
  orientation: 'horizontal' | 'vertical'
}

type NumberInputBlock = BaseBlock & {
  type: 'number'
  placeholder: string
  max: number
  min: number
  required: boolean
}

type TextBlock = BaseBlock & {
  type: 'text'
  value: string
}

type H1Block = BaseBlock & {
  type: 'h1'
  value: string
}

type H2Block = BaseBlock & {
  type: 'h2'
  value: string
}

type H3Block = BaseBlock & {
  type: 'h3'
  value: string
}

type ColorBlock = BaseBlock & {
  type: 'color'
  color: string
}

type DateBlock = BaseBlock & {
  type: 'date'
  date: string
}

type ImageUploadBlock = BaseBlock & {
  type: 'image-upload'
  image: string
}

type SelectBlock = BaseBlock & {
  type: 'select'
  options: string[]
  groupId: string
  groupIndex: number
  isLast: boolean
  isFirst: boolean
}

type CheckboxBlock = BaseBlock & {
  type: 'checkbox'
  checked: boolean
  label: string
  groupId: string
  groupIndex: number
  isLast: boolean
  isFirst: boolean
}

const BLOCK_TYPES = [
  'textinput',
  'divider',
  'number',
  'h1',
  'h2',
  'h3',
  'text',
  'color',
  'date',
  'image-upload',
  'select',
  'checkbox',
] as const
type BlockType = (typeof BLOCK_TYPES)[number]

type GroupableBlock = CheckboxBlock | SelectBlock

export const isGroupableBlock = (block: Block): block is GroupableBlock => {
  return 'groupId' in block
}

export type {
  Manifest,
  Block,
  BaseBlock,
  TextInputBlock,
  DividerBlock,
  BlockType,
  NumberInputBlock,
  H1Block,
  H2Block,
  H3Block,
  TextBlock,
  ColorBlock,
  DateBlock,
  ImageUploadBlock,
  SelectBlock,
  CheckboxBlock,
  GroupableBlock,
}
export { BLOCK_TYPES }
