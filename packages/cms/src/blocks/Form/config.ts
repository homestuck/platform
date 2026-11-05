import type { Block } from 'payload'

import { t } from '#i18n'

export const Form = {
  fields: [
    {
      name: 'form',
      relationTo: 'forms',
      required: true,
      type: 'relationship',
    },
  ],
  interfaceName: 'FormBlock',
  labels: {
    plural: t('blocks:form:labelPlural'),
    singular: t('blocks:form:labelSingular'),
  },
  slug: 'formBlock',
} as const satisfies Block
