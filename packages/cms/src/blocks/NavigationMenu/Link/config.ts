import type { Block } from 'payload'

import { linkField } from '#fields/link'
import { t } from '#i18n'

export const NavigationMenuLink = {
  fields: [
    linkField({
      referenceTypes: ['pages'],
    }),
  ],
  interfaceName: 'NavigationMenuLinkBlock',
  labels: {
    plural: t('blocks:navigationMenuLink:labelPlural'),
    singular: t('blocks:navigationMenuLink:labelSingular'),
  },
  slug: 'navigationMenuLink',
} as const satisfies Block
