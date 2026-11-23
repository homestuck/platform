import type { CollectionConfig } from 'payload'

import { createFolderField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { publishedDocumentAccess } from '#access/publishedDocument'
import { t } from '#i18n'

import { generatePrefix } from './hooks/generatePrefix'

export const Panels = {
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
  fields: [
    {
      label: t('fields:alt:label'),
      name: 'alt',
      required: true,
      type: 'textarea',
    },
    createFolderField({ relationTo: 'stories', required: true }),
    {
      admin: {
        readOnly: true,
      },
      name: 'storySlug',
      type: 'text',
      virtual: 'parentStory.slug',
    },
    {
      admin: {
        readOnly: true,
      },
      name: 'prefix',
      type: 'text',
    },
  ],
  hooks: {
    beforeOperation: [generatePrefix],
  },
  labels: {
    plural: t('collections:panels:labelPlural'),
    singular: t('collections:panels:labelSingular'),
  },
  slug: 'panels',
  upload: {
    crop: false,
    disableLocalStorage: true,
    filenameCompoundIndex: ['storySlug', 'prefix', 'filename'],
    focalPoint: false,
    mimeTypes: ['image/*'],
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
    maxPerDoc: 1,
  },
} as const satisfies CollectionConfig<'panels'>
