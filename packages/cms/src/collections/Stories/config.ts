import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { draftDocumentAccess } from '#access/draftDocument'
import { everyoneAccess } from '#access/everyone'
import { publishedAtField } from '#fields/publishedAt'
import { t } from '#i18n'

const sidebarGroupFields = () =>
  ({
    admin: {
      position: 'sidebar',
    },
    fields: [publishedAtField()],
    type: 'group',
  }) as UnnamedGroupField

export const Stories: CollectionConfig<'stories'> = {
  access: {
    create: draftDocumentAccess,
    read: everyoneAccess,
    update: draftDocumentAccess,
  },
  fields: [sidebarGroupFields()],
  hierarchy: {
    admin: {
      injectSidebarTab: false,
    },
    allowHasMany: false,
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
} as const
