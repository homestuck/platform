import type { CollectionConfig, RelationshipField } from 'payload'

import { t } from '#i18n'

export const Contributors = {
  fields: [
    {
      name: 'dispayName',
      required: true,
      type: 'text',
    },
    {
      hasMany: false,
      name: 'user',
      relationTo: 'users',
      type: 'relationship',
    } satisfies RelationshipField,
  ],
  labels: {
    plural: t('collections:contributors:labelPlural'),
    singular: t('collections:contributors:labelSingular'),
  },
  slug: 'contributors',
  versions: {
    drafts: false,
    maxPerDoc: 0,
  },
} as const satisfies CollectionConfig<'contributors'>
