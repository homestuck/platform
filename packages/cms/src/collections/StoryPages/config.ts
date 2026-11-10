import type { CollectionConfig, Field, NamedTab, NumberField, RelationshipField } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

// import { STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const layoutFieldsTab = {
  fields: [],
  label: t('tabs:layout:label'),
  name: 'layout',
} as const satisfies NamedTab

const navigationFieldsTab = {
  fields: [],
  label: t('tabs:navigation:label'),
  name: 'navigation',
} as const satisfies NamedTab

const sidebarFields = [
  titleField(),
  slugField(),
  publishedAtField(),
  {
    fields: [
      {
        hasMany: false,
        name: 'story',
        relationTo: ['stories'],
        required: true,
        type: 'relationship',
      } satisfies RelationshipField,
      {
        min: 1,
        name: 'pageNumber',
        required: true,
        type: 'number',
      } satisfies NumberField,
    ],
    type: 'row',
  },
] as Field[]

export const StoryPages = {
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      tabs: [layoutFieldsTab, navigationFieldsTab],
      type: 'tabs',
    },
    ...sidebarFields,
  ],
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
