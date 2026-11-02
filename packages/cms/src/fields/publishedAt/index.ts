import type { DateField } from 'payload'

import { deepMerge } from 'payload'

import { populatePublishedAt } from './hooks/populatePublishedAt'

export type PublishedAtField = (args?: Args) => DateField

type Args = {
  overrides?: Partial<DateField>
}

export const publishedAtField: PublishedAtField = ({ overrides = {} } = {}) =>
  deepMerge<DateField>(
    {
      admin: {
        date: {
          displayFormat: 'PPPPpppp',
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [populatePublishedAt],
      },
      label: 'Published At',
      name: 'publishedAt',
      required: false,
      type: 'date',
    },
    overrides,
  )
