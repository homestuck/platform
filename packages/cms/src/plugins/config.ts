import type { Plugin } from 'payload'

import { formBuilderPlugin } from './formBuilder/config'
import { searchPlugin } from './search/config'

export const pluginConfigs: Plugin[] = [formBuilderPlugin(), searchPlugin()]
