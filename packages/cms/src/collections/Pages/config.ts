import type { CollectionConfig } from 'payload'

import { t } from '#i18n'

export const Pages: CollectionConfig<'pages'> = {
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
      blocks: [],
      name: 'layout',
      type: 'blocks',
    },
  ],
  hierarchy: {
    admin: {
      injectSidebarTab: false,
    },
    allowHasMany: false,
    parentFieldName: 'parent',
  },
  labels: {
    plural: t('collections:pages:labelPlural'),
    singular: t('collections:pages:labelSingular'),
  },
  slug: 'pages' as const,
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const
