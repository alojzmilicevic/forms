export type FontOption = {
  name: string
  value: string
  googleFont?: string // Google Fonts URL if needed
}

export const AVAILABLE_FONTS: FontOption[] = [
  {
    name: 'Inter',
    value: 'Inter, sans-serif',
    googleFont: 'Inter:wght@400;500;600;700',
  },
  {
    name: 'Roboto',
    value: 'Roboto, sans-serif',
    googleFont: 'Roboto:wght@400;500;700',
  },
  {
    name: 'Poppins',
    value: 'Poppins, sans-serif',
    googleFont: 'Poppins:wght@400;500;600;700',
  },
  {
    name: 'Montserrat',
    value: 'Montserrat, sans-serif',
    googleFont: 'Montserrat:wght@400;500;600;700',
  },
  {
    name: 'Open Sans',
    value: 'Open Sans, sans-serif',
    googleFont: 'Open+Sans:wght@400;500;600;700',
  },
  {
    name: 'Lato',
    value: 'Lato, sans-serif',
    googleFont: 'Lato:wght@400;700',
  },
  {
    name: 'Playfair Display',
    value: 'Playfair Display, serif',
    googleFont: 'Playfair+Display:wght@400;500;600;700',
  },
  {
    name: 'System UI',
    value: 'system-ui, -apple-system, sans-serif',
  },
  {
    name: 'Monospace',
    value: 'monospace',
  },
]
