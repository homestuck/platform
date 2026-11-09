import type { Plugin } from 'payload'

import { formBuilderPlugin } from './formBuilder/config'
import { redirectsPlugin } from './redirects/config'
import { searchPlugin } from './search/config'

export const pluginConfigs = [
  formBuilderPlugin(),
  redirectsPlugin(),
  searchPlugin(),
] as const satisfies Plugin[]
