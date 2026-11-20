import type { JSONField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type InlineStylesField = (args?: Args) => JSONField

type Args = {
  overrides?: Partial<JSONField>
}

export const inlineStylesField: InlineStylesField = ({ overrides = {} } = {}) =>
  deepMerge<JSONField>(
    {
      admin: {
        editorOptions: {
          tabSize: 2,
        },
      },
      defaultValue: {},
      jsonSchema: {
        fileMatch: [
          'https://raw.githubusercontent.com/mdn/data/refs/heads/main/css/properties.schema.json',
        ],
        schema: {},
        uri: 'https://raw.githubusercontent.com/mdn/data/refs/heads/main/css/properties.schema.json',
      },
      label: t('fields:inlineStyles:label'),
      name: 'inlineStyles',
      type: 'json',
    },
    overrides,
  )
