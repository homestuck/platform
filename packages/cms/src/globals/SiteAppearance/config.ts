import type { GlobalConfig, NamedTab } from 'payload'

import { createCreatedByField, createUpdatedByField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { t } from '#i18n'

import { validateDefaultTheme } from './hooks/validateDefaultTheme'

const themeFieldsTab: NamedTab = {
  fields: [
    {
      hasMany: false,
      name: 'defaultTheme',
      relationTo: 'themes',
      required: true,
      type: 'relationship',
      validate: validateDefaultTheme,
    },
    {
      admin: {
        appearance: 'drawer',
        isSortable: true,
      },
      hasMany: true,
      name: 'userThemes',
      relationTo: 'themes',
      type: 'relationship',
    },
  ],
  label: t('tabs:theme:label'),
  name: 'theme',
} as const

export const SiteAppearance = {
  access: {
    read: everyoneAccess,
    readVersions: everyoneAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      tabs: [themeFieldsTab],
      type: 'tabs',
    },
    createCreatedByField({
      overrides: {
        access: {
          read: authenticatedAccess,
        },
      },
    }),
    createUpdatedByField({
      overrides: {
        access: {
          read: authenticatedAccess,
        },
      },
    }),
  ],
  label: t('globals:site-appearance:label'),
  slug: 'site-appearance',
} satisfies GlobalConfig
