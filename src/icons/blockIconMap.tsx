import {
  CheckboxIcon,
  ColorPickerIcon,
  DateIcon,
  DividerIcon,
  ImageUploadIcon,
  NumberInputIcon,
  TextInputIcon,
  SelectIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  TextIcon,
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
  'number-input': NumberInputIcon,
  textinput: TextInputIcon,
  select: SelectIcon,
  h1: H1Icon,
  h2: H2Icon,
  h3: H3Icon,
  text: TextIcon,
}

export const getBlockIcon = (blockType: string) => {
  return blockIconMap[blockType] || TextIcon
}

