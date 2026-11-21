import type { Post, SiteSettings, Story } from '#payload.types'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

type DataWithSEO = Story | Post

export const generateTitle: GenerateTitle<DataWithSEO> = async ({ doc, req }) => {
  const docTitle = doc?.title ?? null

  const siteSettingsData: SiteSettings = await req.payload.findGlobal({
    depth: 0,
    overrideAccess: true,
    req,
    select: {
      meta: true,
    },
    slug: 'site-settings',
  })

  const siteTitle = siteSettingsData?.meta?.title ?? null

  return [docTitle, siteTitle].filter(Boolean).join(' | ')
}
