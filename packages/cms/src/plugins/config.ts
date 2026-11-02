import type { Plugin } from 'payload'

import { formBuilder } from './formBuilder/config'
import { search } from './search/config'

export const pluginConfigs: Plugin[] = [formBuilder(), search()]
