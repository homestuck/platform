import type { TextField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type ColorField = (args?: Args) => TextField

type Args = {
  overrides?: Partial<TextField>
}

export const colorField: ColorField = ({ overrides = {} } = {}) =>
  deepMerge<TextField>(
    {
      label: t('fields:color:label'),
      name: 'color',
      type: 'text',
    },
    overrides,
  )
