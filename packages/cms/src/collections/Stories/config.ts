import type {
  CollectionConfig,
  NamedTab,
  RelationshipField,
  UnnamedGroupField,
  UnnamedTab,
} from 'payload'

import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields'

import { draftDocumentAccess } from '#access/draftDocument'
import { everyoneAccess } from '#access/everyone'
import { globalAdminAccess } from '#access/globalAdmin'
import { descriptionField } from '#fields/description'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { validateIsNotSelf } from '#hooks/validateIsNotSelf'
import { t } from '#i18n'

// import { STORIES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const overviewFieldsTab: UnnamedTab = {
  fields: [
    {
      fields: [
        {
          admin: {
            width: '40%',
          },
          hasMany: false,
          name: 'image',
          relationTo: 'assets',
          type: 'upload',
        },
        {
          fields: [titleField(), descriptionField()],
          type: 'group',
        },
      ],
      type: 'row',
    },
  ],
  label: t('tabs:overview:label'),
} as const

const pagesFieldTab: UnnamedTab = {
  fields: [
    {
      admin: {
        defaultColumns: ['pageNumber', 'title', 'slug', 'publishedAt'],
      },
      collection: 'story-pages',
      defaultSort: ['-pageNumber'],
      label: false,
      name: 'pages',
      on: 'story',
      orderable: true,
      type: 'join',
    },
  ],
  label: t('tabs:pages:label'),
} as const

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

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    slugField(),
    publishedAtField(),
    {
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      hasMany: false,
      name: 'parent',
      relationTo: 'stories',
      type: 'relationship',
      validate: validateIsNotSelf,
    } as const satisfies RelationshipField,
  ],
  type: 'group',
} as const

export const Stories = {
  access: {
    create: draftDocumentAccess,
    delete: globalAdminAccess,
    read: everyoneAccess,
    update: draftDocumentAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      tabs: [overviewFieldsTab, pagesFieldTab, metaFieldsTab],
      type: 'tabs',
    },
    sidebarFieldsGroup,
  ],
  // hierarchy: {
  //   admin: {
  //     components: {
  //       Icon: STORIES_HIERARCHY_ICON_COMPONENT_PATH,
  //       SmallIcon: STORIES_HIERARCHY_ICON_COMPONENT_PATH,
  //     },
  //     useHeaderButton: false,
  //   },
  //   parentFieldName: 'parent',
  // },
  labels: {
    plural: t('collections:stories:labelPlural'),
    singular: t('collections:stories:labelSingular'),
  },
  slug: 'stories',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'stories'>
