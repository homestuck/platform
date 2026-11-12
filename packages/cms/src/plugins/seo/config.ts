import { seoPlugin as seo } from '@payloadcms/plugin-seo'

import { generateTitle } from './hooks/generateTitle'
import { generateURL } from './hooks/generateURL'

export const seoPlugin = () =>
  seo({
    generateTitle,
    generateURL,
  })
