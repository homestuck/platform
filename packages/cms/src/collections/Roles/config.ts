import type { CollectionConfig } from 'payload'

import { t } from '#i18n'

export const Roles: CollectionConfig<'roles'> = {
  admin: {
    group: 'Access Control',
  },
  fields: [
    {
      admin: {
        description: 'The unique name of this role (e.g., "Admin", "Editor", "Viewer").',
      },
      name: 'name',
      required: true,
      type: 'text',
      unique: true,
    },
    // {
    //   admin: {
    //     description: 'The Permissions assigned to this Role.',
    //   },
    //   hasMany: true,
    //   name: 'permissions',
    //   relationTo: 'permissions',
    //   type: 'relationship',
    // },
  ],
  labels: {
    plural: t('collections:roles:labelPlural'),
    singular: t('collections:roles:labelSingular'),
  },
  slug: 'roles' as const,
} as const
