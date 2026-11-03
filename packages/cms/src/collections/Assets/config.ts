import type { CollectionConfig } from 'payload'

import { publishedDocumentAccess } from '#access/publishedDocumentAccess'
import { t } from '#i18n'

export const Assets: CollectionConfig<'assets'> = {
  access: {
    read: publishedDocumentAccess,
  },
  fields: [],
  labels: {
    plural: t('collections:assets:labelPlural'),
    singular: t('collections:assets:labelSingular'),
  },
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
} as const
