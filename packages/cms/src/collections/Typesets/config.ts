import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { slugify } from 'payload/shared'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { typesetField } from '#fields/typeset'
import { t } from '#i18n'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    titleField(),
    slugField({
      overrides: {
        slugify: ({ valueToSlugify }) => slugify(`typeset-${String(valueToSlugify)}`),
      },
    }),
    publishedAtField(),
  ],
  type: 'group',
} as const

export const Typesets = {
  fields: [...typesetField().fields, sidebarFieldsGroup],
  labels: {
    plural: t('collections:typesets:labelPlural'),
    singular: t('collections:typesets:labelSingular'),
  },
  slug: 'typesets',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'typesets'>
