import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'

export const Posts = {
  fields: [publishedAtField()],
  slug: 'posts',
} satisfies CollectionConfig
