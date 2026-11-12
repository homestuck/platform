import type { GlobalConfig } from 'payload'

import { t } from '#i18n'

export const SiteFooter = {
  admin: {
    group: 'Site Settings',
  },
  fields: [],
  label: t('globals:site-footer:label'),
  slug: 'site-footer',
} satisfies GlobalConfig
