// oxlint-disable sort-keys
import type { SiteAppearance as SiteAppearanceProps } from '#payload.types'

import { StyleSheet } from '@homestuck/ui/components/style-sheet'
import { toKebabCase } from '@homestuck/utils/toKebabCase'

export function SiteAppearance({ theme: { lightMode, darkMode } }: SiteAppearanceProps) {
  const stylesheet = {
    ':root': Object.fromEntries(
      Object.entries(lightMode).map(([key, value]) => [`--${toKebabCase(key)}`, value]),
    ),
    '.dark': Object.fromEntries(
      Object.entries(darkMode).map(([key, value]) => [`--${toKebabCase(key)}`, value]),
    ),
  }
  return <StyleSheet data={stylesheet} />
}
