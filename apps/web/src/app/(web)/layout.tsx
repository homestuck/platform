import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense, cache } from 'react'

import { getPayload } from 'payload'

import { AdminBar } from '@homestuck/cms/components/admin-bar'

import './globals.css'
import { SiteAppearance } from '@homestuck/cms/components/site-appearance'

import configPromise from '#payload.config'

const getSiteAppearance = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const siteAppearance = await payload.findGlobal({
    slug: 'site-appearance',
  })
  return siteAppearance
})

const getSiteConfiguration = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const siteConfiguration = await payload.findGlobal({
    slug: 'site-configuration',
  })
  return siteConfiguration
})

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSiteConfiguration()

  return {
    description: meta?.description ?? 'Example website placeholder description.',
    title: meta?.title ?? 'Website',
  }
}

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  const { isEnabled } = await draftMode()
  const siteAppearance = await getSiteAppearance()
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense>
          <SiteAppearance {...siteAppearance} />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
