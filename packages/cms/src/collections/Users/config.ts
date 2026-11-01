import type { CollectionConfig } from 'payload'

export const Users = {
  access: {
    // admin: LoggedInAccess,
    // create: EveryoneAccess,
    // delete: LoggedInAccess,
    // read: LoggedInAccess,
    // update: (args) => GlobalAdminAccess(args) || SelfAccess(args),
  },
  admin: {
    defaultColumns: ['displayName', 'email'],
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
  slug: 'users' as const,
  timestamps: true,
  versions: false,
} satisfies CollectionConfig
