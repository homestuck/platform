import type { Access } from 'payload'

import { isAuthenticated } from './authenticatedAccess'
import { isGlobalAdmin } from './globalAdminAccess'

export type DraftDocumentAccess = Access

export const draftDocumentAccess: DraftDocumentAccess = ({ req: { user } }) =>
  isAuthenticated(user) &&
  (isGlobalAdmin(user) ?? {
    _status: {
      equals: 'draft',
    },
  })
