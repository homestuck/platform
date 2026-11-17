import type { GlobalConfig } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { revalidateGlobal } from '#hooks/revalidateGlobal'
import { t } from '#i18n'

import { SITE_HEADER_DESCRIPTION_COMPONENT_PATH } from './constants'

export const SiteHeader = {
  access: {
    read: everyoneAccess,
    readVersions: everyoneAccess,
    update: authenticatedAccess,
    validate: authenticatedAccess,
  },
  admin: {
    components: {
      Description: {
        clientProps: {
          translationKey: 'globals:site-header:description',
        },
        path: SITE_HEADER_DESCRIPTION_COMPONENT_PATH,
      },
    },
    group: 'Site Settings',
  },
  fields: [
    {
      blocks: ['navigationMenu'],
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
