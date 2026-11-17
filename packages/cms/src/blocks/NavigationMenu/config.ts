import type { Block } from 'payload'

import { t } from '#i18n'

export const NavigationMenu = {
  fields: [
    {
      blocks: ['archive'],
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
