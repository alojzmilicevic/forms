import { create } from 'zustand'
import { THEME_PRESETS, type ThemeConfig } from '@/styles/themes/presets'
import { AVAILABLE_FONTS } from '@/styles/themes/fonts'

type ThemeMode = 'light' | 'dark' | 'custom'

type ThemeStore = {
  // State
  theme: ThemeMode
  customTheme: ThemeConfig

  // Actions
  setTheme: (theme: 'light' | 'dark') => void
  updateThemeProperty: (property: keyof ThemeConfig, value: string) => void
  initializeTheme: () => void
}

const applyThemeToDOM = (theme: ThemeMode, customTheme?: ThemeConfig) => {
  // Apply theme attribute to root for theme selection
  const root = document.documentElement
  root.setAttribute('data-theme', theme)

  // Apply CSS variables to themed area only
  const themedArea = document.querySelector('.themed-area') as HTMLElement
  
  if (theme === 'custom' && customTheme) {
    // Apply background to root for mainContent access
    root.style.setProperty('--color-background', customTheme.background)
    
    if (themedArea) {
      // Apply custom theme variables to themed area
      themedArea.style.setProperty('--font-family', customTheme.font)
      themedArea.style.setProperty('--font-size', customTheme.fontSize)
      themedArea.style.setProperty('--color-text', customTheme.text)
      themedArea.style.setProperty('--color-button-bg', customTheme.buttonBackground)
      themedArea.style.setProperty('--color-button-text', customTheme.buttonText)
      themedArea.style.setProperty('--color-accent', customTheme.accent)
      themedArea.style.setProperty('--color-input-bg', customTheme.inputBackground)
      themedArea.style.setProperty('--color-input-placeholder', customTheme.inputPlaceholder)
      themedArea.style.setProperty('--color-input-border', customTheme.inputBorder)
    }

    // Load Google Font if needed
    const fontOption = AVAILABLE_FONTS.find((f) => f.value === customTheme.font)
    if (fontOption?.googleFont) {
      loadGoogleFont(fontOption.googleFont)
    }
  } else {
    // Clear inline styles for preset themes (let CSS take over)
    root.style.removeProperty('--color-background')
    
    if (themedArea) {
      themedArea.style.removeProperty('--font-family')
      themedArea.style.removeProperty('--font-size')
      themedArea.style.removeProperty('--color-text')
      themedArea.style.removeProperty('--color-button-bg')
      themedArea.style.removeProperty('--color-button-text')
      themedArea.style.removeProperty('--color-accent')
      themedArea.style.removeProperty('--color-input-bg')
      themedArea.style.removeProperty('--color-input-placeholder')
      themedArea.style.removeProperty('--color-input-border')
    }
  }
}

const loadGoogleFont = (fontFamily: string) => {
  // Check if font is already loaded
  const existingLink = document.querySelector(`link[href*="${fontFamily}"]`)
  if (existingLink) return

  // Create and append font link
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap`
  document.head.appendChild(link)
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  customTheme: THEME_PRESETS.light,

  initializeTheme: () => {
    try {
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null
      const savedCustomTheme = localStorage.getItem('customTheme')

      if (savedTheme) {
        const customTheme = savedCustomTheme ? JSON.parse(savedCustomTheme) : THEME_PRESETS.light

        set({ theme: savedTheme, customTheme })
        applyThemeToDOM(savedTheme, customTheme)
      } else {
        // Apply default theme
        applyThemeToDOM('light')
      }
    } catch (error) {
      console.error('Failed to initialize theme:', error)
      applyThemeToDOM('light')
    }
  },

  setTheme: (theme: 'light' | 'dark') => {
    const presetTheme = THEME_PRESETS[theme]

    set({
      theme,
      customTheme: presetTheme, // Reset to preset values
    })

    applyThemeToDOM(theme)

    // Persist to localStorage
    localStorage.setItem('theme', theme)
    localStorage.removeItem('customTheme')
  },

  updateThemeProperty: (property: keyof ThemeConfig, value: string) => {
    const { theme, customTheme } = get()

    // Get base theme (current preset if not already custom)
    const baseTheme = theme === 'custom' ? customTheme : THEME_PRESETS[theme]

    // Create new custom theme with updated property
    const newCustomTheme = {
      ...baseTheme,
      [property]: value,
    }

    set({
      theme: 'custom',
      customTheme: newCustomTheme,
    })

    applyThemeToDOM('custom', newCustomTheme)

    // Persist to localStorage
    localStorage.setItem('theme', 'custom')
    localStorage.setItem('customTheme', JSON.stringify(newCustomTheme))
  },
}))
