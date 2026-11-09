import { redirectsPlugin as redirects } from '@payloadcms/plugin-redirects'

export const redirectsPlugin = () =>
  redirects({
    collections: ['pages'],
  })
