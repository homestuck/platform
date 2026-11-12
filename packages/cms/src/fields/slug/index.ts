import type { SlugField as PayloadSlugField } from 'payload'

import { deepMerge } from 'payload'

import { t } from '#i18n'

export type SlugField = (args?: Args) => PayloadSlugField

type Args = {
  overrides?: Partial<PayloadSlugField>
}

export const slugField: SlugField = ({ overrides = {} } = {}) =>
  deepMerge<PayloadSlugField>(
    {
      admin: {
        description: t('fields:slug:description'),
      },
      label: t('fields:slug:label'),
      name: 'slug',
      type: 'slug',
      useAsSlug: 'title',
    },
    overrides,
  )
