import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

import { getPayload } from 'payload'

import { AdminBar } from '@homestuck/cms/components/admin-bar'

import './globals.css'
import { SiteAppearance } from '@homestuck/cms/components/site-appearance'
import { SiteFooter } from '@homestuck/cms/components/site-footer'
import { SiteHeader } from '@homestuck/cms/components/site-header'
import { ThemeProvider } from '@homestuck/ui/providers/ThemeProvider'

import configPromise from '#payload.config'

const getSiteSettings = async () => {
  'use cache'
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })
  return siteSettings
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getSiteSettings()

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={'class'} disableTransitionOnChange>
          <SiteAppearance />
          <Suspense>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
          </Suspense>
          <SiteHeader />
          <main
            className={
              'bg-background text-foreground @container/main flex grow flex-col items-center justify-start'
            }>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const instant = false
