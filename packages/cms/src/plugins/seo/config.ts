import { seoPlugin as seo } from '@payloadcms/plugin-seo'

import { generateURL } from './hooks/generateURL'

export const seoPlugin = () =>
  seo({
    generateURL,
  })
