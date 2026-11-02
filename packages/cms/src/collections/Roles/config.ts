import type { CollectionConfig } from 'payload'

export const Roles = {
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
    {
      admin: {
        description: 'The Permissions assigned to this Role.',
      },
      hasMany: true,
      name: 'permissions',
      relationTo: 'permissions',
      type: 'relationship',
    },
  ],
  slug: 'roles' as const,
} satisfies CollectionConfig
