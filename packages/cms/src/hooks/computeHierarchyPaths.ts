import type { CollectionBeforeReadHook } from 'payload'

export const computeHierarchyPaths: CollectionBeforeReadHook = ({ context }) => ({
  ...context,
  computeHierarchyPaths: true,
})
