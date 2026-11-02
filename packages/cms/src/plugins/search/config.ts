import { searchPlugin } from '@payloadcms/plugin-search'

export const search = () =>
  searchPlugin({
    collections: ['pages', 'posts'],
  })
