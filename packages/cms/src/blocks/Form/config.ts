import type { Block } from 'payload'

import { richTextField } from '#fields/richText'
import { t } from '#i18n'

export const Form = {
  fields: [
    {
      name: 'form',
      relationTo: 'forms',
      required: true,
      type: 'relationship',
    },
    {
      label: 'Enable Intro Content',
      name: 'enableIntro',
      type: 'checkbox',
    },
    richTextField({
      overrides: {
        admin: {
          condition: (_, { enableIntro }) => Boolean(enableIntro),
        },
        label: 'Intro Content',
        name: 'introContent',
      },
    }),
  ],
  interfaceName: 'FormBlock',
  labels: {
    plural: t('blocks:form:labelPlural'),
    singular: t('blocks:form:labelSingular'),
  },
  slug: 'formBlock',
} as const satisfies Block
