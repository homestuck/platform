import type { PolymorphicRelationshipField } from 'payload'

import { createCreatedByField, deepMerge } from 'payload'

import { globalAdminAccess } from '#access/globalAdmin'

export type CreatedByField = (args?: Args) => PolymorphicRelationshipField

type Args = {
  overrides?: Partial<PolymorphicRelationshipField>
}

export const createdByField: CreatedByField = ({ overrides = {} } = {}) =>
  deepMerge<PolymorphicRelationshipField>(
    createCreatedByField({
      authCollections: ['users'],
      overrides: {
        access: {
          read: globalAdminAccess,
        },
      },
    }),
    overrides,
  )
