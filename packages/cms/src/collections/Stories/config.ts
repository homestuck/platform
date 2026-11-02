import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'

export const Stories = {
  fields: [publishedAtField()],
  slug: 'stories',
} satisfies CollectionConfig
