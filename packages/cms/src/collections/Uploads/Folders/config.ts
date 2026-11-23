import type { CollectionConfig } from 'payload'

import { createFolderField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { FOLDERS_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

export const Folders = {
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: everyoneAccess,
    unlock: authenticatedAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    group: 'Uploads',
    useAsTitle: 'name',
  },
  authorship: false,
  fields: [
    titleField({
      overrides: {
        name: 'name',
      },
    }),
    slugField({
      overrides: {
        useAsSlug: 'name',
      },
    }),
    createFolderField({ label: 'Parent Story', relationTo: 'stories' }),
    createFolderField({ relationTo: 'folders' }),
  ],
  hierarchy: {
    admin: {
      components: {
        Icon: FOLDERS_HIERARCHY_ICON_COMPONENT_PATH,
        SmallIcon: FOLDERS_HIERARCHY_ICON_COMPONENT_PATH,
      },
      injectSidebarTab: false,
    },
    allowHasMany: false,
    collectionSpecific: true,
    parentFieldName: 'parent',
  },
  labels: {
    plural: t('collections:folders:labelPlural'),
    singular: t('collections:folders:labelSingular'),
  },
  slug: 'folders',
} as const satisfies CollectionConfig<'folders'>
