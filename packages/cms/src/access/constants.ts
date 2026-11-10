import type { Where } from 'payload'

export const IS_PUBLISHED_DOCUMENT_QUERY = {
  _status: {
    equals: 'published',
  },
} as const satisfies Where
