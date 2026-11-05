import type { CollectionConfig } from 'payload'

import { t } from '#i18n'

import { PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

export const Pages = {
  admin: {
    useAsTitle: 'title',
  },
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
    {
      blocks: ['archive'],
      name: 'layout',
      type: 'blocks',
    },
  ],
  hierarchy: {
    admin: {
      components: {
        Icon: PAGES_HIERARCHY_ICON_COMPONENT_PATH,
      },
    },
    allowHasMany: false,
    collectionSpecific: true,
    parentFieldName: 'parent',
  },
  labels: {
    plural: t('collections:pages:labelPlural'),
    singular: t('collections:pages:labelSingular'),
  },

  slug: 'pages',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'pages'>
