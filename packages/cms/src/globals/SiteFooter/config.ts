import type { GlobalConfig } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { t } from '#i18n'

export const SiteFooter = {
  access: {
    read: everyoneAccess,
    readVersions: everyoneAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    group: 'Site Configuration',
  },
  authorship: false,
  fields: [
    {
      blocks: ['navigationMenu'],
      name: 'layout',
      type: 'blocks',
    },
  ],
  label: t('globals:site-footer:label'),
  slug: 'site-footer',
} satisfies GlobalConfig
