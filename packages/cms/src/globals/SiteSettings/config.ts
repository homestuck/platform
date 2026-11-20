import type { GlobalConfig, NamedTab, UnnamedTab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticatedAccess } from '#access/authenticated'
import { everyoneAccess } from '#access/everyone'
import { descriptionField } from '#fields/description'
import { titleField } from '#fields/title'
import { revalidateGlobal } from '#hooks/revalidateGlobal'
import { t } from '#i18n'

import { validateDefaultTheme } from './hooks/validateDefaultTheme'

const overviewFieldsTab: UnnamedTab = {
  fields: [
    {
      fields: [
        {
          admin: {
            width: '40%',
          },
          hasMany: false,
          name: 'favicon',
          relationTo: 'assets',
          type: 'upload',
        },
        {
          fields: [
            titleField(),
            descriptionField({
              overrides: {
                admin: {
                  description: t('fields:description:description', {
                    document: 'site',
                  }),
                },
              },
            }),
          ],
          type: 'group',
        },
      ],
      type: 'row',
    },
  ],
  label: t('tabs:overview:label'),
} as const

const appearanceFieldsTab: NamedTab = {
  fields: [
    {
      tabs: [
        {
          fields: [
            {
              hasMany: false,
              name: 'theme',
              relationTo: 'themes',
              required: true,
              type: 'relationship',
              validate: validateDefaultTheme,
            },
          ],
          label: t('tabs:theme:label'),
        },
      ],
      type: 'tabs',
    },
  ],
  label: t('tabs:appearance:label'),
  name: 'appearance',
} as const

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

export const SiteSettings = {
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
      tabs: [overviewFieldsTab, appearanceFieldsTab, metaFieldsTab],
      type: 'tabs',
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
  label: t('globals:site-settings:label'),
  slug: 'site-settings',
  typescript: {
    interface: 'SiteSettings',
  },
} satisfies GlobalConfig
