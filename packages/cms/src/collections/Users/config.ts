import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
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
  slug: 'users',
  timestamps: true,
  versions: false,
}
