import type { GlobalConfig, NamedTab } from 'payload'

import { everyoneAccess } from '#access/everyone'
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
  access: {
    read: everyoneAccess,
  },
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
