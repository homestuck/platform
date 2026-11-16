// oxlint-disable sort-keys
'use client'
import type { SiteAppearance as SiteAppearanceData } from '#payload.types'

import { StyleSheet } from '@homestuck/ui/components/style-sheet'
import { toKebabCase } from '@homestuck/utils/toKebabCase'

type SiteAppearanceProps = {
  data: SiteAppearanceData
}

export function SiteAppearanceClient({
  data: {
    theme: { defaultTheme },
  },
}: SiteAppearanceProps) {
  if (typeof defaultTheme === 'string') return

  const { lightMode = {}, darkMode = {} } = defaultTheme
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
