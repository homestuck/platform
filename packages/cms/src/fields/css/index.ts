import type { CodeField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type CSSField = (args?: Args) => CodeField

type Args = {
  overrides?: Partial<CodeField>
}

export const cssField: CSSField = ({ overrides = {} } = {}) =>
  deepMerge<CodeField>(
    {
      admin: {
        editorOptions: {
          tabSize: 2,
        },
        language: 'css',
      },
      label: t('fields:css:label'),
      name: 'css',
      type: 'code',
    },
    overrides,
  )
