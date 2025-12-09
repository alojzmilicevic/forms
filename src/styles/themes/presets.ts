export type ThemeConfig = {
  font: string
  fontSize: string
  background: string
  text: string
  buttonBackground: string
  buttonText: string
  accent: string
  inputBackground: string
  inputPlaceholder: string
  inputBorder: string
}

export const THEME_PRESETS: Record<'light' | 'dark', ThemeConfig> = {
  light: {
    font: 'Inter, sans-serif',
    fontSize: '14px',
    background: '#FFFFFF',
    text: '#37352F',
    buttonBackground: '#000000',
    buttonText: '#FFFFFF',
    accent: '#0070D7',
    inputBackground: 'transparent',
    inputPlaceholder: '#bbbab8',
    inputBorder: '#3d3b3529',
  },
  dark: {
    font: 'Inter, sans-serif',
    fontSize: '14px',
    background: '#1A1917',
    text: '#DFDFDE',
    buttonBackground: '#7957FF',
    buttonText: '#FFFFFF',
    accent: '#7957FF',
    inputBackground: '#ffffff0e',
    inputPlaceholder: '#5a5a5a',
    inputBorder: '#d2d2d229',
  },
} as const
