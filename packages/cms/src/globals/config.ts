import type { GlobalConfig } from 'payload'

import { SiteFooter } from './SiteFooter/config'
import { SiteHeader } from './SiteHeader/config'
import { SiteSettings } from './SiteSettings/config'

export const globalConfigs = [
  SiteSettings,
  SiteHeader,
  SiteFooter,
] as const satisfies GlobalConfig[]
