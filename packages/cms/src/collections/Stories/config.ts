import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { draftDocumentAccess } from '#access/draftDocument'
import { everyoneAccess } from '#access/everyone'
import { globalAdminAccess } from '#access/globalAdmin'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { STORIES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const sidebarGroupFields = () =>
  ({
    admin: {
      position: 'sidebar',
    },
    fields: [slugField(), publishedAtField()],
    type: 'group',
  }) as UnnamedGroupField

export const Stories = {
  access: {
    create: draftDocumentAccess,
    delete: globalAdminAccess,
    read: everyoneAccess,
    update: draftDocumentAccess,
  },
  fields: [sidebarGroupFields(), titleField()],
  hierarchy: {
    admin: {
      components: {
        Icon: STORIES_HIERARCHY_ICON_COMPONENT_PATH,
      },
      injectSidebarTab: false,
    },
    allowHasMany: false,
    collectionSpecific: { fieldName: 'hierarchyType' },
    parentFieldName: 'parent',
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
