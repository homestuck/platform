import { searchPlugin as search } from '@payloadcms/plugin-search'

export const searchPlugin = () =>
  search({
    collections: ['pages', 'posts'],
  })
