import type { CollectionConfig } from 'payload'

import { everyoneAccess } from '#access/everyone'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

// import { PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

export const Pages = {
  access: {
    read: everyoneAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    titleField({
      overrides: {
        required: true,
      },
    }),
    slugField(),
    {
      blocks: ['archive'],
      name: 'layout',
      type: 'blocks',
    },
  ],
  // hierarchy: {
  //   admin: {
  //     components: {
  //       Icon: PAGES_HIERARCHY_ICON_COMPONENT_PATH,
  //       SmallIcon: PAGES_HIERARCHY_ICON_COMPONENT_PATH,
  //     },
  //   },
  //   parentFieldName: 'parent',
  // },
  labels: {
    plural: t('collections:pages:labelPlural'),
    singular: t('collections:pages:labelSingular'),
  },
  slug: 'pages',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'pages'>
