import type {
  CollectionConfig,
  NamedTab,
  NumberField,
  RelationshipField,
  UnnamedGroupField,
} from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { validateIsInteger } from '#hooks/validateIsInteger'
import { t } from '#i18n'

// import { STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const layoutFieldsTab = {
  fields: [
    { blocks: ['richText'], name: 'header', type: 'blocks' },
    { blocks: ['richText'], name: 'content', type: 'blocks' },
    { blocks: ['richText'], name: 'footer', type: 'blocks' },
  ],
  label: t('tabs:layout:label'),
  name: 'layout',
} as const satisfies NamedTab

const navigationFieldsTab = {
  fields: [],
  label: t('tabs:navigation:label'),
  name: 'navigation',
} as const satisfies NamedTab

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    titleField(),
    slugField(),
    publishedAtField(),
    {
      fields: [
        {
          admin: {
            allowCreate: false,
            allowEdit: false,
            width: '60%',
          },
          hasMany: false,
          name: 'story',
          relationTo: ['stories'],
          required: true,
          type: 'relationship',
        } satisfies RelationshipField,
        {
          admin: {
            step: 1,
            width: '40%',
          },
          min: 1,
          name: 'pageNumber',
          required: true,
          type: 'number',
          validate: validateIsInteger,
        } satisfies NumberField,
      ],
      type: 'row',
    },
  ],
  type: 'group',
} as const

export const StoryPages = {
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      tabs: [layoutFieldsTab, navigationFieldsTab],
      type: 'tabs',
    },
    sidebarFieldsGroup,
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
