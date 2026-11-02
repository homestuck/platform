import type { CollectionConfig } from 'payload'

import { PublishedDocumentAccess } from '#access/PublishedDocument'

export const Assets = {
  access: {
    read: PublishedDocumentAccess,
  },
  fields: [],
  slug: 'assets',
  upload: {
    disableLocalStorage: true,
    filenameCompoundIndex: ['prefix', 'filename'],
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} satisfies CollectionConfig
