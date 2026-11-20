import { StyleSheet } from '@homestuck/ui/style-sheet'
import { toKebabCase } from '@homestuck/utils/toKebabCase'

import { getCachedGlobal } from '#utils/getGlobal'

export async function SiteAppearance() {
  const { appearance: siteAppearance } = await getCachedGlobal('site-settings')
  const { theme } = siteAppearance

  if (!theme || typeof theme === 'string') return

  const { lightMode = {}, darkMode = {} } = theme
  // oxlint-disable sort-keys
  const stylesheet = {
    ':root': Object.fromEntries(
      Object.entries(lightMode).map(([key, value]) => [`--${toKebabCase(key)}`, value ?? '']),
    ),
    '.dark': Object.fromEntries(
      Object.entries(darkMode).map(([key, value]) => [`--${toKebabCase(key)}`, value ?? '']),
    ),
  }
  return <StyleSheet data={stylesheet} />
}
