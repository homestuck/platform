import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { themeField } from '#fields/theme'
import { titleField } from '#fields/title'
import { t } from '#i18n'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [titleField(), slugField(), publishedAtField()],
  type: 'group',
} as const

export const Themes = {
  fields: [
    sidebarFieldsGroup,
    {
      tabs: [
        {
          fields: [
            themeField({
              isRequired: false,
              themeMode: 'light',
              withDefaults: false,
            }),
          ],
          label: t('tabs:lightMode:label'),
          name: 'lightMode',
        },
        {
          fields: [
            themeField({
              isRequired: false,
              themeMode: 'dark',
              withDefaults: false,
            }),
          ],
          label: t('tabs:darkMode:label'),
          name: 'darkMode',
        },
      ],
      type: 'tabs',
    },
  ],
  labels: {
    plural: t('collections:themes:labelPlural'),
    singular: t('collections:themes:labelSingular'),
  },
  slug: 'themes',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'themes'>
