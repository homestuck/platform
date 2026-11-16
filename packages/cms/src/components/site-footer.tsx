import { getCachedGlobal } from '#utils/getGlobal'

import { SiteFooterClient } from './site-footer.client'

export async function SiteFooter() {
  const siteFooter = await getCachedGlobal('site-footer')
  return <SiteFooterClient data={siteFooter} />
}
