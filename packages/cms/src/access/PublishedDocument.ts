import type { Access } from 'payload'

import { isGlobalAdmin } from './GlobalAdmin'

export const PublishedDocumentAccess: Access = ({ req: { user } }) =>
  isGlobalAdmin(user) ?? {
    _status: {
      equals: 'published',
    },
  }
