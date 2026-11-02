import type { CollectionConfig } from 'payload'

export const Permissions = {
  admin: {
    group: 'Access Control',
  },
  fields: [],
  slug: 'permissions' as const,
} satisfies CollectionConfig
