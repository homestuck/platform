import type { CollectionSlug, OptionObject } from 'payload'

import { t } from '#i18n'

export const ARCHIVE_REFERENCES = [
  {
    label: t('collections:stories:labelPlural'),
    value: 'stories',
  },
  {
    label: t('collections:story-pages:labelPlural'),
    value: 'story-pages',
  },
  {
    label: t('collections:pages:labelPlural'),
    value: 'pages',
  },
] as const satisfies OptionObject[]

export const ARCHIVE_REFERENCE_SLUGS = ARCHIVE_REFERENCES.map<CollectionSlug>(({ value }) => value)
