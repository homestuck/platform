import type { CollectionConfig } from 'payload'

export const Pages = {
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'slug',
      type: 'slug',
      useAsSlug: 'title',
    },
  ],
  slug: 'pages' as const,
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} satisfies CollectionConfig
