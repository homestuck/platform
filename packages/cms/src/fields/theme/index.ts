import type { ThemeMode, ThemeModeValues, ThemeToken } from './types'
import type { GroupField, TabsField, TextField, UnnamedGroupField } from 'payload'

import { deepMerge } from 'payload'

import { colorField } from '#fields/color'
import { t } from '#i18n'

import * as CONSTANTS from './constants'

const themeModeFields = ({
  defaultValues,
  required = false,
}: {
  defaultValues?: Partial<ThemeModeValues>
  required?: boolean | Partial<Record<ThemeToken, boolean>>
}) =>
  ({
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
                  required:
                    typeof required === 'boolean' ? required : (required[themeSlug] ?? false),
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
                  required:
                    typeof required === 'boolean' ? required : (required[themeSlug] ?? false),
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
                  required:
                    typeof required === 'boolean' ? required : (required[themeSlug] ?? false),
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
                  required:
                    typeof required === 'boolean' ? required : (required[themeSlug] ?? false),
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
  }) as UnnamedGroupField

type Args = {
  defaultValues?: Partial<Record<ThemeMode, Partial<ThemeModeValues>>>
  required?: boolean | Partial<Record<ThemeMode, Partial<Record<ThemeToken, boolean>>>>
  overrides?: Partial<GroupField>
  darkModeOverrides?: Partial<TabsField>
  lightModeOverrides?: Partial<TabsField>
}

export type ThemeField = (args?: Args) => GroupField

export const themeField: ThemeField = ({
  defaultValues = {},
  required = false,
  darkModeOverrides = {},
  lightModeOverrides = {},
  overrides = {},
} = {}) => {
  return deepMerge<GroupField>(
    {
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          tabs: [
            deepMerge(
              {
                fields: [
                  themeModeFields({
                    defaultValues: defaultValues.light ?? undefined,
                    required: typeof required === 'boolean' ? required : (required.light ?? false),
                  }),
                ],
                label: t('tabs:lightMode:label'),
                name: 'lightMode',
              },
              lightModeOverrides,
            ),
            deepMerge(
              {
                fields: [
                  themeModeFields({
                    defaultValues: defaultValues.dark ?? undefined,
                    required: typeof required === 'boolean' ? required : (required.dark ?? false),
                  }),
                ],
                label: t('tabs:darkMode:label'),
                name: 'darkMode',
              },
              darkModeOverrides,
            ),
          ],
          type: 'tabs',
        },
      ],
      name: 'theme',
      type: 'group',
    },
    overrides,
  )
}
