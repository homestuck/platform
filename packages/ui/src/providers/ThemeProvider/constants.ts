export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)' as const

export const IS_SERVER = globalThis.window === undefined
