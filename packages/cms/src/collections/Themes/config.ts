import type { CollectionConfig, NamedTab, UnnamedGroupField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { defaultTheme } from './defaults'
import { themeModeField } from './fields/themeMode'
import { generateHasAllThemeTokens } from './hooks/generateHasAllThemeTokens'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    titleField(),
    slugField(),
    {
      admin: {
        hidden: true,
      },
      defaultValue: false,
      hooks: {
        afterRead: [generateHasAllThemeTokens],
      },
      name: 'hasAllThemeTokens',
      type: 'checkbox',
      virtual: true,
    },
  ],
  type: 'group',
} as const

const lightModeFieldsTab: NamedTab = {
  fields: [themeModeField({ defaultValues: defaultTheme.light })],
  label: t('tabs:lightMode:label'),
  name: 'lightMode',
}

const darkModeFieldsTab: NamedTab = {
  fields: [themeModeField({ defaultValues: defaultTheme.dark })],
  label: t('tabs:darkMode:label'),
  name: 'darkMode',
}

export const Themes = {
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: everyoneAccess,
    unlock: authenticatedAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    darkMode: true,
    hasAllThemeTokens: true,
    lightMode: true,
    slug: true,
  },
  fields: [
    {
      tabs: [lightModeFieldsTab, darkModeFieldsTab],
      type: 'tabs',
    },
    sidebarFieldsGroup,
  ],
  labels: {
    plural: t('collections:themes:labelPlural'),
    singular: t('collections:themes:labelSingular'),
  },
  slug: 'themes',
} as const satisfies CollectionConfig<'themes'>
