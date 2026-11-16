import type { GlobalConfig } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { revalidateGlobal } from '#hooks/revalidateGlobal'
import { t } from '#i18n'

export const SiteHeader = {
  access: {
    read: everyoneAccess,
    readVersions: everyoneAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      blocks: ['archive'],
      name: 'layout',
      type: 'blocks',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
  label: t('globals:site-header:label'),
  slug: 'site-header',
} satisfies GlobalConfig
