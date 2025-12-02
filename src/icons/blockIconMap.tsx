import type { JSX } from 'react'
import {
  CheckboxIcon,
  ColorPickerIcon,
  DateIcon,
  DividerIcon,
  ImageUploadIcon,
  TextInputIcon,
  SelectIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  TextIcon,
  NumberIcon,
} from './index'

type BlockIconMap = {
  [key: string]: ({ className }: { className?: string }) => JSX.Element
}

export const blockIconMap: BlockIconMap = {
  checkbox: CheckboxIcon,
  colorpicker: ColorPickerIcon,
  date: DateIcon,
  divider: DividerIcon,
  'image-upload': ImageUploadIcon,
  textinput: TextInputIcon,
  select: SelectIcon,
  h1: H1Icon,
  h2: H2Icon,
  h3: H3Icon,
  text: TextIcon,
  number: NumberIcon,
}

import type { BlockType } from '@/manifest.type'

export const getBlockIcon = (blockType: BlockType) => {
  return blockIconMap[blockType] || TextIcon
}

