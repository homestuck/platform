import { getCachedGlobal } from '#utils/getGlobal'

import { SiteAppearanceClient } from './site-appearance.client'

export async function SiteAppearance() {
  const siteAppearance = await getCachedGlobal('site-appearance', 1)
  return <SiteAppearanceClient data={siteAppearance} />
}
