import type { GlobalConfig, NamedTab } from 'payload'

import { themeField } from '#fields/theme'
import { t } from '#i18n'

const themeFieldsTab: NamedTab = {
  fields: [
    {
      tabs: [
        {
          fields: [
            themeField({
              isRequired: true,
              themeMode: 'light',
              withDefaults: true,
            }),
          ],
          label: t('tabs:lightMode:label'),
          name: 'lightMode',
        },
        {
          fields: [
            themeField({
              isRequired: true,
              themeMode: 'dark',
              withDefaults: true,
            }),
          ],
          label: t('tabs:darkMode:label'),
          name: 'darkMode',
        },
      ],
      type: 'tabs',
    },
  ],
  label: t('tabs:theme:label'),
  name: 'theme',
} as const

export const SiteAppearance = {
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      tabs: [themeFieldsTab],
      type: 'tabs',
    },
  ],
  label: t('globals:site-appearance:label'),
  slug: 'site-appearance',
} satisfies GlobalConfig
