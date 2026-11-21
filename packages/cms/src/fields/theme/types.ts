import type * as CONSTANTS from './constants'

export type ThemeToken = (typeof CONSTANTS.THEME_TOKENS)[number]

export type ThemeMode = (typeof CONSTANTS.THEME_MODES)[keyof typeof CONSTANTS.THEME_MODES]

export type ThemeModeValues = Record<ThemeToken, string>
