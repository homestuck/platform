import type {
  CollectionConfig,
  NamedTab,
  RelationshipField,
  UnnamedGroupField,
  UnnamedTab,
} from 'payload'

import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields'

import { everyoneAccess } from '#access/everyone'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { urlField } from '#fields/url'
import { revalidateCollection } from '#hooks/revalidateCollection'
import { validateIsNotSelf } from '#hooks/validateIsNotSelf'
import { t } from '#i18n'

import { PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

// import { PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    slugField(),
    publishedAtField(),
    urlField(),
    {
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      hasMany: false,
      name: 'parent',
      relationTo: 'pages',
      type: 'relationship',
      validate: validateIsNotSelf,
    } as const satisfies RelationshipField,
  ],
  type: 'group',
} as const

const layoutFieldsTab = {
  fields: [
    {
      blocks: ['richText', 'formBlock'],
      name: 'layout',
      type: 'blocks',
    },
  ],
  label: t('tabs:layout:label'),
} as const satisfies UnnamedTab

const metaFieldsTab: NamedTab = {
  fields: [
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaDescriptionField({}),
    OverviewField({
      descriptionPath: 'meta.description',
      // imagePath: 'meta.image',
      titlePath: 'meta.title',
    }),
  ],
  label: t('tabs:meta:label'),
  name: 'meta',
} as const

export const Pages = {
  access: {
    read: everyoneAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  authorship: false,
  fields: [
    titleField({
      overrides: {
        admin: {
          position: 'sidebar',
        },
        required: true,
      },
    }),
    sidebarFieldsGroup,
    {
      tabs: [layoutFieldsTab, metaFieldsTab],
      type: 'tabs',
    },
  ],
  hierarchy: {
    admin: {
      components: {
        Icon: PAGES_HIERARCHY_ICON_COMPONENT_PATH,
        SmallIcon: PAGES_HIERARCHY_ICON_COMPONENT_PATH,
      },
    },
    allowHasMany: false,
    parentFieldName: 'parentPage',
    slugField: 'slug',
  },
  hooks: {
    afterChange: [revalidateCollection],
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
