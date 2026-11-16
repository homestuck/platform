import { getCachedGlobal } from '#utils/getGlobal'

import { SiteHeaderClient } from './site-header.client'

export async function SiteHeader() {
  const siteHeader = await getCachedGlobal('site-header')
  return <SiteHeaderClient data={siteHeader} />
}
