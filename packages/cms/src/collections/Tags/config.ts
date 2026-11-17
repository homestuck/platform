import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { titleField } from '#fields/title'
import { t } from '#i18n'

export const Tags = {
  fields: [
    titleField({
      overrides: {
        unique: true,
      },
    }),
    publishedAtField(),
  ],
  labels: {
    plural: t('collections:tags:labelPlural'),
    singular: t('collections:tags:labelSingular'),
  },
  slug: 'tags',
  tags: true,
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'tags'>
