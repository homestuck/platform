import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { slugify } from 'payload/shared'

import { cssStylesField } from '#fields/cssStyles'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { TYPESET_PREVIEW_FIELD_COMPONENT_PATH } from './constants'

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
  fields: [
    {
      fields: [
        {
          admin: {
            width: '50%',
          },
          fields: [
            {
              defaultValue: 'Geist',
              name: 'fontHeading',
              required: true,
              type: 'text',
            },
            {
              defaultValue: 'Geist',
              name: 'fontBody',
              required: true,
              type: 'text',
            },
            {
              defaultValue: 'Geist Mono',
              name: 'fontMono',
              required: true,
              type: 'text',
            },
            {
              defaultValue: '15px',
              name: 'size',
              required: true,
              type: 'text',
            },
            {
              admin: {
                step: 0.25,
              },
              defaultValue: 1.75,
              min: 0,
              name: 'leading',
              required: true,
              type: 'number',
            },
            {
              defaultValue: '1.25em',
              name: 'flow',
              required: true,
              type: 'text',
            },
            cssStylesField(),
          ],
          type: 'group',
        },
        {
          admin: {
            components: {
              Field: TYPESET_PREVIEW_FIELD_COMPONENT_PATH,
            },
            width: '50%',
          },
          name: 'typesetPreview',
          type: 'ui',
        },
      ],
      type: 'row',
    },
    sidebarFieldsGroup,
  ],
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
