import type { CollectionConfig } from 'payload'

import { createFolderField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { publishedDocumentAccess } from '#access/publishedDocument'
import { t } from '#i18n'

export const Audio = {
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: publishedDocumentAccess,
    readVersions: authenticatedAccess,
    unlock: authenticatedAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    group: 'Uploads',
  },
  authorship: false,
  fields: [createFolderField({ relationTo: 'folders' })],
  labels: {
    plural: t('collections:audio:labelPlural'),
    singular: t('collections:audio:labelSingular'),
  },
  slug: 'audio',
  upload: {
    crop: false,
    disableLocalStorage: true,
    filenameCompoundIndex: ['prefix', 'filename'],
    focalPoint: false,
    mimeTypes: ['audio/*'],
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'audio'>
