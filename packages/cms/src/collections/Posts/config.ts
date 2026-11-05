import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { t } from '#i18n'

export const Posts = {
  fields: [publishedAtField()],
  labels: {
    plural: t('collections:posts:labelPlural'),
    singular: t('collections:posts:labelSingular'),
  },
  slug: 'posts',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'posts'>
