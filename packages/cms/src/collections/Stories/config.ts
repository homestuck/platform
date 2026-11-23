import type { CollectionConfig, NamedTab, UnnamedGroupField, UnnamedTab } from 'payload'

import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields'
import { createFolderField } from 'payload'

import { draftDocumentAccess } from '#access/draftDocument'
import { everyoneAccess } from '#access/everyone'
import { globalAdminAccess } from '#access/globalAdmin'
import { descriptionField } from '#fields/description'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { STORIES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

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
          fields: [
            descriptionField({
              overrides: {
                admin: {
                  description: t('fields:description:description', {
                    document: 'story',
                  }),
                },
              },
            }),
          ],
          type: 'group',
        },
      ],
      type: 'row',
    },
  ],
  label: t('tabs:overview:label'),
} as const

const metaFieldsTab: NamedTab = {
  fields: [
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaDescriptionField({}),
    OverviewField({
      descriptionPath: 'meta.description',
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
  fields: [slugField(), publishedAtField(), createFolderField({ relationTo: 'stories' })],
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
    titleField(),
    createFolderField({ relationTo: 'folders' }),
    {
      tabs: [overviewFieldsTab, metaFieldsTab],
      type: 'tabs',
    },
    sidebarFieldsGroup,
  ],
  hierarchy: {
    admin: {
      components: {
        Icon: STORIES_HIERARCHY_ICON_COMPONENT_PATH,
        SmallIcon: STORIES_HIERARCHY_ICON_COMPONENT_PATH,
      },
    },
    allowHasMany: false,
    collectionSpecific: true,
    parentFieldName: 'parentStory',
  },
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
