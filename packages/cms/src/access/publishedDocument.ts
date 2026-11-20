import type { Access, TypeWithID } from 'payload'

import { IS_PUBLISHED_DOCUMENT_QUERY } from './constants'
import { isGlobalAdmin } from './globalAdmin'

export type PublishedDocumentAccess = Access<TypeWithID>

export const publishedDocumentAccess: PublishedDocumentAccess = ({ req: { user } }) =>
  isGlobalAdmin(user) || IS_PUBLISHED_DOCUMENT_QUERY
