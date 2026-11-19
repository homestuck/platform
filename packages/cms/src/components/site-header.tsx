import { getCachedGlobal } from '#utils/getGlobal'

import { SiteHeaderClient } from './site-header.client'

export async function SiteHeader() {
  const siteHeader = await getCachedGlobal('site-header', 1)
  return <SiteHeaderClient data={siteHeader} />
}
