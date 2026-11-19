import type { Block } from 'payload'

import { t } from '#i18n'

export const NavigationMenuList = {
  fields: [
    {
      blocks: ['navigationMenuLink', 'navigationMenuDropdown'],
      name: 'items',
      type: 'blocks',
    },
  ],
  interfaceName: 'NavigationMenuListBlock',
  labels: {
    plural: t('blocks:navigationMenuList:labelPlural'),
    singular: t('blocks:navigationMenuList:labelSingular'),
  },
  slug: 'navigationMenuList',
} as const satisfies Block
