import type { CodeField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type CSSStylesField = (args?: Args) => CodeField

type Args = {
  overrides?: Partial<CodeField>
}

export const cssStylesField: CSSStylesField = ({ overrides = {} } = {}) =>
  deepMerge<CodeField>(
    {
      admin: {
        description: t('fields:cssStyles:description'),
        editorOptions: {
          tabSize: 2,
        },
        language: 'css',
      },
      label: t('fields:cssStyles:label'),
      name: 'cssStyles',
      type: 'code',
    },
    overrides,
  )
