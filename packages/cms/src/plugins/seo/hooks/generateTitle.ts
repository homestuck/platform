import type { Post, SiteConfiguration, Story } from '#payload.types'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

type DataWithSEO = Story | Post | SiteConfiguration

export const generateTitle: GenerateTitle<DataWithSEO> = async ({ doc, req }) => {
  const docTitle = doc?.title ?? null

  const siteConfigurationData: SiteConfiguration = await req.payload.findGlobal({
    overrideAccess: true,
    req,
    slug: 'site-configuration',
  })

  const siteTitle = siteConfigurationData?.meta?.title ?? null

  return [docTitle, siteTitle].filter(Boolean).join(' | ')
}
