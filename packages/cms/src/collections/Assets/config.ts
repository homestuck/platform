import type { Asset } from '#payload.types'
import type { CollectionConfig, Condition } from 'payload'

import { publishedDocumentAccess } from '#access/publishedDocument'
import { t } from '#i18n'

export const Assets = {
  access: {
    read: publishedDocumentAccess,
  },
  fields: [
    {
      admin: {
        condition: (({ mimeType }) =>
          Boolean(
            mimeType?.startsWith('image/') ?? mimeType?.startsWith('video/'),
          )) satisfies Condition<Asset>,
      },
      defaultValue: '',
      label: t('fields:alt:label'),
      name: 'alt',
      type: 'textarea',
    },
  ],
  labels: {
    plural: t('collections:assets:labelPlural'),
    singular: t('collections:assets:labelSingular'),
  },
  slug: 'assets',
  upload: {
    crop: false,
    disableLocalStorage: true,
    filenameCompoundIndex: ['prefix', 'filename'],
    focalPoint: false,
  },
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'assets'>
