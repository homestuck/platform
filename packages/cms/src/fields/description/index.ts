import type { TextareaField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type DescriptionField = (args?: Args) => TextareaField

type Args = {
  overrides?: Partial<TextareaField>
}

export const descriptionField: DescriptionField = ({ overrides = {} } = {}) =>
  deepMerge<TextareaField>(
    {
      admin: {
        description: t('fields:description:description'),
      },
      label: t('fields:description:label'),
      name: 'description',
      type: 'textarea',
    },
    overrides,
  )
