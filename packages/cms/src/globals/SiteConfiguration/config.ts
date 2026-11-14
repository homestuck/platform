import type { GlobalConfig, NamedTab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { everyoneAccess } from '#access/everyone'
import { t } from '#i18n'

const metaFieldsTab: NamedTab = {
  fields: [
    MetaTitleField({
      hasGenerateFn: false,
      overrides: {
        minLength: 1,
      },
    }),
    MetaDescriptionField({
      hasGenerateFn: false,
    }),
    MetaImageField({
      hasGenerateFn: false,
      overrides: {
        admin: {
          description: t('plugin-seo:imageDescription'),
        },
      },
      relationTo: 'assets',
    }),
    PreviewField({
      descriptionPath: 'meta.description',
      hasGenerateFn: true,
      titlePath: 'meta.title',
    }),
    OverviewField({
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
      titleOverrides: {
        minLength: 1,
      },
      titlePath: 'meta.title',
    }),
  ],
  label: t('tabs:meta:label'),
  name: 'meta',
} as const

export const SiteConfiguration = {
  access: {
    read: everyoneAccess,
  },
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      tabs: [metaFieldsTab],
      type: 'tabs',
    },
  ],
  label: t('globals:site-configuration:label'),
  slug: 'site-configuration',
} satisfies GlobalConfig
