import type { GlobalConfig } from 'payload'

import { SiteFooter } from './SiteFooter/config'
import { SiteHeader } from './SiteHeader/config'

export const globalConfigs = [SiteFooter, SiteHeader] as const satisfies GlobalConfig[]
