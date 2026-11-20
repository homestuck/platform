import type { GlobalConfig, UnnamedGroupField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { cssField } from '#fields/css'
import { revalidateGlobal } from '#hooks/revalidateGlobal'
import { t } from '#i18n'

import { SITE_HEADER_DESCRIPTION_COMPONENT_PATH } from './constants'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      fields: [
        cssField({
          overrides: {
            label: false,
          },
        }),
      ],
      label: t('fields:css:label'),
      type: 'collapsible',
    },
  ],
  type: 'group',
} as const

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
    sidebarFieldsGroup,
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
  label: t('globals:site-header:label'),
  slug: 'site-header',
} satisfies GlobalConfig
