import type { Block } from 'payload'

import { t } from '#i18n'

export const Script = {
  fields: [
    {
      name: 'code',
      required: true,
      type: 'code',
    },
  ],
  interfaceName: 'ScriptBlock',
  labels: {
    plural: t('blocks:script:labelPlural'),
    singular: t('blocks:script:labelSingular'),
  },
  slug: 'script',
} as const satisfies Block
