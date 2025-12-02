type Manifest = {
  name: string
  description: string
  blocks: Block[]
}

type Block = {
  id: string
  order: number
  type: BlockType
}

type TextInputBlock = Block & {
  type: 'textinput'
  placeholder: string
  maxLength: number
  minLength: number
  required: boolean
}

type DividerBlock = Block & {
  type: 'divider'
  orientation: 'horizontal' | 'vertical'
}

type NumberInputBlock = Block & {
  type: 'number'
  placeholder: string
  max: number
  min: number
  required: boolean
}

type TextBlock = Block & {
  value: string
}

type H1Block = TextBlock & {
  type: 'h1'
}

type H2Block = TextBlock & {
  type: 'h2'
}

type H3Block = TextBlock & {
  type: 'h3'
}

type ColorBlock = Block & {
  type: 'color'
  color: string
}

type DateBlock = Block & {
  type: 'date'
  date: string
}

type ImageUploadBlock = Block & {
  type: 'image-upload'
  image: string
}

type SelectBlock = Block & {
  type: 'select'
  options: string[]
}

type CheckboxBlock = Block & {
  type: 'checkbox'
  checked: boolean
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
type BlockVariant =
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

export type {
  Manifest,
  Block,
  TextInputBlock,
  DividerBlock,
  BlockType,
  BlockVariant,
  NumberInputBlock,
  H1Block,
  H2Block,
  H3Block,
  TextBlock,
  ColorBlock,
  DateBlock,
  ImageUploadBlock,
}
export { BLOCK_TYPES }
