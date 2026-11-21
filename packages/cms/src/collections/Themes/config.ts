import type {
  CollectionConfig,
  // UnnamedGroupField
} from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { slugField } from '#fields/slug'
import { themeField } from '#fields/theme'
import { titleField } from '#fields/title'
import { t } from '#i18n'

// const sidebarFieldsGroup: UnnamedGroupField = {
//   admin: {
//     position: 'sidebar',
//   },
//   fields: [],
//   type: 'group',
// } as const

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
    lightMode: true,
    slug: true,
  },
  fields: [
    {
      fields: [titleField(), slugField()],
      type: 'row',
    },
    ...themeField().fields,
    // sidebarFieldsGroup,
  ],
  labels: {
    plural: t('collections:themes:labelPlural'),
    singular: t('collections:themes:labelSingular'),
  },
  slug: 'themes',
} as const satisfies CollectionConfig<'themes'>
