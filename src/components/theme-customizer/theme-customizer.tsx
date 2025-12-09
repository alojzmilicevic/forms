import { useThemeStore } from '@/store/theme-store'
import { AVAILABLE_FONTS } from '@/styles/themes/fonts'
import { Color } from '@/blocks/components/color/color'
import styles from './theme-customizer.module.scss'

export const ThemeCustomizer = () => {
  const theme = useThemeStore((state) => state.theme)
  const customTheme = useThemeStore((state) => state.customTheme)
  const setTheme = useThemeStore((state) => state.setTheme)
  const updateThemeProperty = useThemeStore((state) => state.updateThemeProperty)

  return (
    <div className={styles.customizer}>
      {/* Theme Mode Selection */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Theme</h3>
        <div className={styles.themeButtons}>
          <button
            className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'custom' ? styles.active : ''}`}
            disabled
          >
            Custom
          </button>
        </div>
        {theme === 'custom' && (
          <p className={styles.hint}>Custom theme active. Select Light or Dark to reset.</p>
        )}
      </div>

      {/* Font Family */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Font</h3>
        <select
          className={styles.select}
          value={customTheme.font}
          onChange={(e) => updateThemeProperty('font', e.target.value)}
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Background Color */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Background</h3>
        <Color
          color={customTheme.background}
          onChange={(e) => updateThemeProperty('background', e.target.value)}
        />
      </div>

      {/* Text Color */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Text</h3>
        <Color
          color={customTheme.text}
          onChange={(e) => updateThemeProperty('text', e.target.value)}
        />
      </div>

      {/* Button Background */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Button Background</h3>
        <Color
          color={customTheme.buttonBackground}
          onChange={(e) => updateThemeProperty('buttonBackground', e.target.value)}
        />
      </div>

      {/* Button Text */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Button Text</h3>
        <Color
          color={customTheme.buttonText}
          onChange={(e) => updateThemeProperty('buttonText', e.target.value)}
        />
      </div>

      {/* Accent Color */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Accent</h3>
        <Color
          color={customTheme.accent}
          onChange={(e) => updateThemeProperty('accent', e.target.value)}
        />
      </div>

      {/* Input Background */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Input Background</h3>
        <Color
          color={customTheme.inputBackground}
          onChange={(e) => updateThemeProperty('inputBackground', e.target.value)}
        />
      </div>

      {/* Input Placeholder */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Input Placeholder</h3>
        <Color
          color={customTheme.inputPlaceholder}
          onChange={(e) => updateThemeProperty('inputPlaceholder', e.target.value)}
        />
      </div>

      {/* Input Border */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Input Border</h3>
        <Color
          color={customTheme.inputBorder}
          onChange={(e) => updateThemeProperty('inputBorder', e.target.value)}
        />
      </div>
    </div>
  )
}
