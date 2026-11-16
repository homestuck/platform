import type * as CONSTANTS from './constants'

export type Theme = string

export type ThemeMode = (typeof CONSTANTS.THEME_MODES)[keyof typeof CONSTANTS.THEME_MODES]

export type ThemeContext = {
  forcedTheme?: string
  theme?: Theme
  setTheme: (theme?: Theme) => void
  themeMode?: ThemeMode
  setThemeMode: (themeMode: ThemeMode) => void
}

type ValueObject = Record<string, string>

type DataAttribute = `data-${string}`

type ScriptProps = Record<DataAttribute, unknown> &
  React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>

export type UseThemeProps = {
  /**
   * List of all available theme names
   */
  themeModes: string[]
  /**
   * Forced theme name for the current page
   */
  forcedTheme?: string
  /**
   * Update the theme
   */
  setTheme: React.Dispatch<React.SetStateAction<string>>
  /**
   * Active theme name
   */
  themeMode?: string
  /**
   * If `enableSystem` is true and the active theme is "system", this returns whether the system
   * preference resolved to "dark" or "light". Otherwise, identical to `theme`
   */
  resolvedTheme?: string
  /**
   * If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless
   * what the active theme is
   */
  systemTheme?: ThemeMode
}

export type Attribute = DataAttribute | 'class'

export type ThemeProviderProps = {
  /**
   * List of all available theme names
   */
  themeModes?: string[]
  /**
   * Forced theme name for the current page
   */
  forcedTheme?: string
  /**
   * Whether to switch between dark and light themes based on prefers-color-scheme
   */
  enableSystem?: boolean
  /**
   * Disable all CSS transitions when switching themes
   */
  disableTransitionOnChange?: boolean
  /**
   * Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like
   * inputs and buttons
   */
  enableColorScheme?: boolean
  /**
   * Key used to store theme setting in localStorage
   */
  storageKey?: string
  /**
   * Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false,
   * the default theme is light
   */
  defaultTheme?: string
  /**
   * HTML attribute modified based on the active theme. Accepts `class`, `data-*` (meaning any data
   * attribute, `data-mode`, `data-color`, etc.), or an array which could include both
   */
  attribute?: Attribute | Attribute[]
  /**
   * Mapping of theme name to HTML attribute value. Object where key is the theme name and value is
   * the attribute value
   */
  value?: ValueObject
  /**
   * Nonce string to pass to the inline script and style elements for CSP headers
   */
  nonce?: string
  /**
   * Props to pass the inline script
   */
  scriptProps?: ScriptProps
} & React.PropsWithChildren
