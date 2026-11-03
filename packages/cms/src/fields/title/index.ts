import type { TextField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type TitleField = (args?: Args) => TextField

type Args = {
  overrides?: Partial<TextField>
}

export const titleField: TitleField = ({ overrides = {} } = {}) =>
  deepMerge<TextField>(
    {
      label: t('fields:title:label'),
      name: 'title',
      type: 'text',
    },
    overrides,
  )
