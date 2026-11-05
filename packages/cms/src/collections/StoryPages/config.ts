import type { CollectionConfig } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { t } from '#i18n'

export const StoryPages = {
  admin: {},
  fields: [publishedAtField()],
  labels: {
    plural: t('collections:story-pages:labelPlural'),
    singular: t('collections:story-pages:labelSingular'),
  },
  slug: 'story-pages',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'story-pages'>
