import type { Metadata } from 'next'
import { cache } from 'react'

import { getPayload } from 'payload'

import configPromise from '#payload.config'

import './globals.css'

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

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
