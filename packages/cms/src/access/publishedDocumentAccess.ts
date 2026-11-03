import type { Access } from 'payload'

import { isGlobalAdmin } from './globalAdminAccess'

export type PublishedDocumentAccess = Access

export const publishedDocumentAccess: PublishedDocumentAccess = ({ req: { user } }) =>
  isGlobalAdmin(user) ?? {
    _status: {
      equals: 'published',
    },
  }
