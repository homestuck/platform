import type { CollectionConfig } from 'payload'

import { t } from '#i18n'

export const Users: CollectionConfig<'users'> = {
  access: {
    // admin: LoggedInAccess,
    // create: EveryoneAccess,
    // delete: LoggedInAccess,
    // read: LoggedInAccess,
    // update: (args) => GlobalAdminAccess(args) || SelfAccess(args),
  },
  admin: {
    defaultColumns: ['displayName', 'email'],
    group: 'Access Control',
    useAsTitle: 'displayName',
  },
  auth: true,
  fields: [
    {
      name: 'displayName',
      type: 'text',
    },
    {
      defaultValue: false,
      name: 'isGlobalAdmin',
      type: 'checkbox',
    },
  ],
  labels: {
    plural: t('collections:users:labelPlural'),
    singular: t('collections:users:labelSingular'),
  },
  slug: 'users' as const,
  timestamps: true,
  versions: false,
} as const
