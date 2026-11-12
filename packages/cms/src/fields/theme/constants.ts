export const THEME_SURFACE_TOKENS = [
  'background',
  'foreground',
  'card',
  'cardForeground',
  'popover',
  'popoverForeground',
] as const

export const THEME_SEMANTIC_TOKENS = [
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'destructive',
  'destructiveForeground',
] as const

export const THEME_OUTLINE_TOKENS = ['border', 'input', 'ring'] as const

export const THEME_DATA_TOKENS = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'] as const

export const THEME_TOKENS = [
  ...THEME_SURFACE_TOKENS,
  ...THEME_SEMANTIC_TOKENS,
  ...THEME_OUTLINE_TOKENS,
  ...THEME_DATA_TOKENS,
  // 'sidebar',
  // 'sidebarAccent',
  // 'sidebarAccentForeground',
  // 'sidebarBorder',
  // 'sidebarForeground',
  // 'sidebarPrimary',
  // 'sidebarPrimaryForeground',
  // 'sidebarRing',
] as const

export const THEME_MODES = {
  DARK: 'dark',
  LIGHT: 'light',
} as const
