import type { GlobalConfig } from 'payload'

import { SiteAppearance } from './SiteAppearance/config'
import { SiteConfiguration } from './SiteConfiguration/config'
import { SiteFooter } from './SiteFooter/config'
import { SiteHeader } from './SiteHeader/config'

export const globalConfigs = [
  SiteConfiguration,
  SiteAppearance,
  SiteHeader,
  SiteFooter,
] as const satisfies GlobalConfig[]
