import type { Where } from 'payload'

export const IS_PUBLISHED_DOCUMENT_QUERY = {
  _status: {
    equals: 'published',
  },
} as const satisfies Where

export const IS_DRAFT_DOCUMENT_QUERY = {
  _status: {
    equals: 'draft',
  },
} as const satisfies Where
