import type { Block, CollectionSlug, OptionObject } from 'payload'

import { t } from '#i18n'

const archiveRelationToOptions = [
  {
    label: t('collections:stories:labelPlural'),
    value: 'stories',
  },
  {
    label: t('collections:story-pages:labelPlural'),
    value: 'story-pages',
  },
  {
    label: t('collections:pages:labelPlural'),
    value: 'pages',
  },
] as const satisfies OptionObject[]

const archiveSelectedDocsRelationTo = archiveRelationToOptions.map(
  (option) => option.value satisfies CollectionSlug,
)

export const Archive = {
  fields: [
    {
      admin: {
        description: 'The method to use to populate this Archive.',
      },
      defaultValue: 'collection',
      name: 'populateBy',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
      type: 'select',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description: 'The collection(s) documents to display in this Archive.',
      },
      label: 'Collections to Show',
      name: 'relationTo',
      options: archiveRelationToOptions,
      type: 'select',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        description:
          'How many documents to display in this Archive. (Set to 0 to display all documents.)',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
      min: 0,
      name: 'limit',
      type: 'number',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
        description: 'Which documents to display in this Archive.',
      },
      hasMany: true,
      label: 'Selection',
      name: 'selectedDocs',
      relationTo: archiveSelectedDocsRelationTo,
      type: 'relationship',
    },
  ],
  interfaceName: 'ArchiveBlock',
  labels: {
    plural: t('blocks:archive:labelPlural'),
    singular: t('blocks:archive:labelSingular'),
  },
  slug: 'archive',
} as const satisfies Block
