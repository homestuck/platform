import type { CollectionConfig, RelationshipField, UnnamedGroupField } from 'payload'

import { everyoneAccess } from '#access/everyone'
import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { revalidateCollection } from '#hooks/revalidateCollection'
import { validateIsNotSelf } from '#hooks/validateIsNotSelf'
import { t } from '#i18n'

// import { PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const sidebarFieldsGroup: UnnamedGroupField = {
  admin: {
    position: 'sidebar',
  },
  fields: [
    titleField({
      overrides: {
        required: true,
      },
    }),
    slugField(),
    publishedAtField(),
    {
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      hasMany: false,
      name: 'parent',
      relationTo: 'pages',
      type: 'relationship',
      validate: validateIsNotSelf,
    } as const satisfies RelationshipField,
  ],
  type: 'group',
} as const

export const Pages = {
  access: {
    read: everyoneAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      blocks: ['archive', 'formBlock'],
      name: 'layout',
      type: 'blocks',
    },
    sidebarFieldsGroup,
  ],
  hooks: {
    afterChange: [revalidateCollection],
  },
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
