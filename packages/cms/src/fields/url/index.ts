import type { TextField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type URLField = (args?: Args) => TextField

type Args = {
  overrides?: Partial<TextField>
}

export const urlField: URLField = ({ overrides = {} } = {}) =>
  deepMerge<TextField>(
    {
      label: t('fields:url:label'),
      name: 'url',
      type: 'text',
    },
    overrides,
  )
