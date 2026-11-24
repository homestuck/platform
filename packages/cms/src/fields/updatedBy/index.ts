import type { PolymorphicRelationshipField } from 'payload'

import { createUpdatedByField, deepMerge } from 'payload'

import { globalAdminAccess } from '#access/globalAdmin'

export type UpdatedByField = (args?: Args) => PolymorphicRelationshipField

type Args = {
  overrides?: Partial<PolymorphicRelationshipField>
}

export const updatedByField: UpdatedByField = ({ overrides = {} } = {}) =>
  deepMerge<PolymorphicRelationshipField>(
    createUpdatedByField({
      authCollections: ['users'],
      overrides: {
        access: {
          read: globalAdminAccess,
        },
      },
    }),
    overrides,
  )
