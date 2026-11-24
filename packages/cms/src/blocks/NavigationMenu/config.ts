import type { Block } from 'payload'

import { t } from '#i18n'

export const NavigationMenu = {
  fields: [
    {
      blocks: ['navigationMenuList'],
      label: false,
      name: 'content',
      type: 'blocks',
    },
  ],
  interfaceName: 'NavigationMenuBlock',
  labels: {
    plural: t('blocks:navigationMenu:labelPlural'),
    singular: t('blocks:navigationMenu:labelSingular'),
  },
  slug: 'navigationMenu',
} as const satisfies Block

export * from './Dropdown/config'
export * from './Link/config'
export * from './List/config'
