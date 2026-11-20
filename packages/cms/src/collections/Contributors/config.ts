import type { CollectionConfig, RelationshipField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { globalAdminAccess } from '#access/globalAdmin'
import { t } from '#i18n'

export const Contributors = {
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: everyoneAccess,
    readVersions: authenticatedAccess,
    unlock: authenticatedAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  authorship: false,
  fields: [
    {
      name: 'displayName',
      required: true,
      type: 'text',
    },
    {
      access: {
        update: globalAdminAccess,
      },
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
