import type { Plugin } from 'payload'

import { formBuilderPlugin } from './formBuilder/config'
import { redirectsPlugin } from './redirects/config'
import { searchPlugin } from './search/config'
import { seoPlugin } from './seo/config'

export const pluginConfigs = [
  formBuilderPlugin(),
  redirectsPlugin(),
  searchPlugin(),
  seoPlugin(),
] as const satisfies Plugin[]
