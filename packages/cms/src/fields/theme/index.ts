import type { ThemeMode } from './types'
import type { GroupField, TextField, UnnamedGroupField } from 'payload'

import { deepMerge } from 'payload'

import { colorField } from '#fields/color'
import { t } from '#i18n'

import {
  THEME_DATA_TOKENS,
  THEME_OUTLINE_TOKENS,
  THEME_SEMANTIC_TOKENS,
  THEME_SURFACE_TOKENS,
} from './constants'
import { defaultTheme } from './defaults'

export type ThemeField = (args?: Args) => GroupField

type Args = {
  /**
   * Require all theme token fields to have a value. (Default: false)
   */
  isRequired?: boolean
  overrides?: Partial<GroupField>
  themeMode?: ThemeMode
  /**
   * Use default values for all theme token fields. (Default: false)
   */
  withDefaults?: boolean
}

export const themeField: ThemeField = ({
  isRequired: required = false,
  overrides = {},
  themeMode = 'light',
  withDefaults = false,
} = {}) => {
  const surfaceTokenFieldsGroup: UnnamedGroupField = {
    admin: {
      description: t('fields:theme:surfaceGroup:description'),
      hideGutter: true,
    },
    fields: [
      {
        fields: THEME_SURFACE_TOKENS.map<TextField>((themeSlug) =>
          colorField({
            overrides: {
              admin: {
                description: t(`fields:theme:${themeSlug}:description`),
                width: '50%',
              },
              defaultValue: withDefaults ? defaultTheme[themeMode][themeSlug] : undefined,
              label: t(`fields:theme:${themeSlug}:label`),
              name: themeSlug,
              required,
              type: 'text',
            },
          }),
        ),
        type: 'row',
      },
    ],
    label: t('fields:theme:surfaceGroup:label'),
    type: 'group',
  } as const

  const semanticTokenFieldsGroup: UnnamedGroupField = {
    admin: {
      description: t('fields:theme:semanticGroup:description'),
      hideGutter: true,
    },
    fields: [
      {
        fields: THEME_SEMANTIC_TOKENS.map<TextField>((themeSlug) =>
          colorField({
            overrides: {
              admin: {
                description: t(`fields:theme:${themeSlug}:description`),
                width: '50%',
              },
              defaultValue: withDefaults ? defaultTheme[themeMode][themeSlug] : undefined,
              label: t(`fields:theme:${themeSlug}:label`),
              name: themeSlug,
              required,
              type: 'text',
            },
          }),
        ),
        type: 'row',
      },
    ],
    label: t('fields:theme:semanticGroup:label'),
    type: 'group',
  } as const

  const outlineTokenFieldsGroup: UnnamedGroupField = {
    admin: {
      description: t('fields:theme:outlineGroup:description'),
      hideGutter: true,
    },
    fields: [
      {
        fields: THEME_OUTLINE_TOKENS.map<TextField>((themeSlug) =>
          colorField({
            overrides: {
              admin: {
                description: t(`fields:theme:${themeSlug}:description`),
                width: '50%',
              },
              defaultValue: withDefaults ? defaultTheme[themeMode][themeSlug] : undefined,
              label: t(`fields:theme:${themeSlug}:label`),
              name: themeSlug,
              required,
              type: 'text',
            },
          }),
        ),
        type: 'row',
      },
    ],
    label: t('fields:theme:outlineGroup:label'),
    type: 'group',
  } as const

  const dataTokenFieldsGroup: UnnamedGroupField = {
    admin: {
      description: t('fields:theme:dataGroup:description'),
      hideGutter: true,
    },
    fields: [
      {
        fields: THEME_DATA_TOKENS.map<TextField>((themeSlug) =>
          colorField({
            overrides: {
              admin: {
                description: t(`fields:theme:${themeSlug}:description`),
                width: '50%',
              },
              defaultValue: withDefaults ? defaultTheme[themeMode][themeSlug] : undefined,
              label: t(`fields:theme:${themeSlug}:label`),
              name: themeSlug,
              required,
              type: 'text',
            },
          }),
        ),
        type: 'row',
      },
    ],
    label: t('fields:theme:dataGroup:label'),
    type: 'group',
  } as const

  return deepMerge<GroupField>(
    {
      admin: {
        hideGutter: true,
      },
      fields: [
        surfaceTokenFieldsGroup,
        semanticTokenFieldsGroup,
        outlineTokenFieldsGroup,
        dataTokenFieldsGroup,
      ],
      type: 'group',
    },
    overrides,
  )
}
