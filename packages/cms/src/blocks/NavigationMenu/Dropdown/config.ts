import type { Block } from 'payload'

import { richTextField } from '#fields/richText'
import { t } from '#i18n'

export const NavigationMenuDropdown = {
  fields: [
    richTextField({
      overrides: {
        name: 'trigger',
      },
    }),
    {
      blocks: ['navigationMenuLink'],
      name: 'content',
      type: 'blocks',
    },
  ],
  interfaceName: 'NavigationMenuDropdownBlock',
  labels: {
    plural: t('blocks:navigationMenuDropdown:labelPlural'),
    singular: t('blocks:navigationMenuDropdown:labelSingular'),
  },
  slug: 'navigationMenuDropdown',
} as const satisfies Block
