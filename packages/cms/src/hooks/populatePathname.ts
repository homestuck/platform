import type { CollectionAfterReadHook } from 'payload'

export const populatePathname: CollectionAfterReadHook = ({ collection }) => {
  switch (collection.slug) {
    case 'story-pages': {
      return
    }
    default: {
      return
    }
  }
}
