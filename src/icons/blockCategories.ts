export type BlockCategory = 'layout' | 'input'

export const blockCategories: Record<string, BlockCategory> = {
  h1: 'layout',
  h2: 'layout',
  h3: 'layout',
  divider: 'layout',
  text: 'layout',
  checkbox: 'input',
  colorpicker: 'input',
  date: 'input',
  'image-upload': 'input',
  'number-input': 'input',
  textinput: 'input',
  select: 'input',
}

export const categoryLabels: Record<BlockCategory, string> = {
  layout: 'Layout blocks',
  input: 'Input blocks',
}

