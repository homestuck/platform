import type { GlobalConfig, NamedTab, UnnamedTab } from 'payload'

import { MetaDescriptionField, MetaTitleField, OverviewField } from '@payloadcms/plugin-seo/fields'

import { descriptionField } from '#fields/description'
import { titleField } from '#fields/title'
import { t } from '#i18n'

const overviewFieldsTab: UnnamedTab = {
  fields: [titleField(), descriptionField()],
  label: t('tabs:overview:label'),
} as const

const metaFieldsTab: NamedTab = {
  fields: [
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaDescriptionField({}),
    OverviewField({
      descriptionPath: 'meta.description',
      // imagePath: 'meta.image',
      titlePath: 'meta.title',
    }),
  ],
  label: t('tabs:meta:label'),
  name: 'meta',
} as const

export const SiteConfiguration = {
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      tabs: [overviewFieldsTab, metaFieldsTab],
      type: 'tabs',
    },
  ],
  label: t('globals:site-configuration:label'),
  slug: 'site-configuration',
} satisfies GlobalConfig
