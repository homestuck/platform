import type { Access } from 'payload'

import { isAuthenticated } from './authenticated'
import { isGlobalAdmin } from './globalAdmin'

export type DraftDocumentAccess = Access

export const draftDocumentAccess: DraftDocumentAccess = ({ req: { user } }) =>
  isAuthenticated(user)
    ? (isGlobalAdmin(user) ?? {
        _status: {
          equals: 'draft',
        },
      })
    : false
