import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

export const Posts = {
  fields: [publishedAtField(), titleField(), slugField()],
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
