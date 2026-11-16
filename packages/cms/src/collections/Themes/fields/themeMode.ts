import type { ThemeToken } from '../types'
import type { TextField, UnnamedGroupField } from 'payload'

import { colorField } from '#fields/color'
import { t } from '#i18n'

import * as CONSTANTS from '../constants'

type Args = { defaultValues?: Record<ThemeToken, string> }

export type ThemeModeField = (args?: Args) => UnnamedGroupField

export const themeModeField: ThemeModeField = ({ defaultValues } = {}) => ({
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      admin: {
        description: t('fields:theme:surfaceGroup:description'),
        hideGutter: true,
      },
      fields: [
        {
          fields: CONSTANTS.THEME_SURFACE_TOKENS.map<TextField>((themeSlug) =>
            colorField({
              overrides: {
                admin: {
                  description: t(`fields:theme:${themeSlug}:description`),
                  width: '50%',
                },
                defaultValue: defaultValues?.[themeSlug],
                label: t(`fields:theme:${themeSlug}:label`),
                name: themeSlug,
                type: 'text',
              },
            }),
          ),
          type: 'row',
        },
      ],
      label: t('fields:theme:surfaceGroup:label'),
      type: 'group',
    },
    {
      admin: {
        description: t('fields:theme:semanticGroup:description'),
        hideGutter: true,
      },
      fields: [
        {
          fields: CONSTANTS.THEME_SEMANTIC_TOKENS.map<TextField>((themeSlug) =>
            colorField({
              overrides: {
                admin: {
                  description: t(`fields:theme:${themeSlug}:description`),
                  width: '50%',
                },
                defaultValue: defaultValues?.[themeSlug],
                label: t(`fields:theme:${themeSlug}:label`),
                name: themeSlug,
                type: 'text',
              },
            }),
          ),
          type: 'row',
        },
      ],
      label: t('fields:theme:semanticGroup:label'),
      type: 'group',
    },
    {
      admin: {
        description: t('fields:theme:outlineGroup:description'),
        hideGutter: true,
      },
      fields: [
        {
          fields: CONSTANTS.THEME_OUTLINE_TOKENS.map<TextField>((themeSlug) =>
            colorField({
              overrides: {
                admin: {
                  description: t(`fields:theme:${themeSlug}:description`),
                  width: '33%',
                },
                defaultValue: defaultValues?.[themeSlug],
                label: t(`fields:theme:${themeSlug}:label`),
                name: themeSlug,
                type: 'text',
              },
            }),
          ),
          type: 'row',
        },
      ],
      label: t('fields:theme:outlineGroup:label'),
      type: 'group',
    },
    {
      admin: {
        description: t('fields:theme:dataGroup:description'),
        hideGutter: true,
      },
      fields: [
        {
          fields: CONSTANTS.THEME_DATA_TOKENS.map<TextField>((themeSlug) =>
            colorField({
              overrides: {
                admin: {
                  description: t(`fields:theme:${themeSlug}:description`),
                  width: '20%',
                },
                defaultValue: defaultValues?.[themeSlug],
                label: t(`fields:theme:${themeSlug}:label`),
                name: themeSlug,
                type: 'text',
              },
            }),
          ),
          type: 'row',
        },
      ],
      label: t('fields:theme:dataGroup:label'),
      type: 'group',
    },
  ],
  type: 'group',
})
