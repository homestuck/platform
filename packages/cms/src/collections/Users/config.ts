import type { CollectionConfig } from 'payload'

import { env as nodeEnv } from '@homestuck/env/node'

import { t } from '#i18n'

export const Users: CollectionConfig = {
  access: {
    // admin: LoggedInAccess,
    // create: EveryoneAccess,
    // delete: LoggedInAccess,
    // read: LoggedInAccess,
    read: () => true,
    // update: (args) => GlobalAdminAccess(args) || SelfAccess(args),
  },
  admin: {
    defaultColumns: ['displayName', 'email'],
    group: 'Access Control',
    useAsTitle: 'displayName',
  },
  auth: {
    tokenExpiration: nodeEnv.NODE_ENV === 'development' ? 60 * 60 * 24 : 60 * 60 * 2,
  },
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
  slug: 'users',
  timestamps: true,
  versions: false,
} as const satisfies CollectionConfig<'users'>
