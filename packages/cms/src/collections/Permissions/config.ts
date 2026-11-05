import type { CollectionConfig } from 'payload'

import { t } from '#i18n'

export const Permissions = {
  admin: {
    group: 'Access Control',
  },
  fields: [],
  labels: {
    plural: t('collections:permissions:labelPlural'),
    singular: t('collections:permissions:labelSingular'),
  },
  slug: 'permissions',
} as const satisfies CollectionConfig<'permissions'>
