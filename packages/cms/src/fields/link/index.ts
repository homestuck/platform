import type { CollectionSlug, GroupField, RelationshipField } from 'payload'

import { deepMerge } from 'payload'

type Args = {
  referenceTypes?: CollectionSlug[]
  overrides?: Partial<GroupField>
}

export type LinkField = (args?: Args) => GroupField

export const linkField: LinkField = ({ referenceTypes = [], overrides = {} } = {}) => {
  const withReferences = referenceTypes.length > 0

  return deepMerge<GroupField>(
    {
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          fields: [
            {
              admin: {
                layout: 'horizontal',
                width: '40%',
              },
              defaultValue: withReferences ? 'reference' : 'custom',
              name: 'type',
              options: [
                ...(withReferences
                  ? [
                      {
                        label: 'Internal link',
                        value: 'reference',
                      },
                    ]
                  : []),
                {
                  label: 'External URL',
                  value: 'custom',
                },
              ],
              required: true,
              type: 'radio',
            },
            ...(withReferences
              ? [
                  {
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === 'reference',
                      width: '40%',
                    },
                    label: 'Document to link to',
                    name: 'reference',
                    relationTo: referenceTypes,
                    required: true,
                    type: 'relationship',
                  } as RelationshipField,
                ]
              : []),
            {
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                width: '40%',
              },
              label: 'Custom URL',
              name: 'url',
              required: true,
              type: 'text',
            },
            {
              admin: {
                style: {
                  alignSelf: 'flex-end',
                },
                width: '20%',
              },
              label: 'Open in new tab',
              name: 'newTab',
              type: 'checkbox',
            },
          ],
          type: 'row',
        },
      ],
      name: 'link',
      type: 'group',
    },
    overrides,
  )
}
