// import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
// import { cache } from 'react'
// import { getPayload } from 'payload'

import { AdminBar } from '@homestuck/cms/components/admin-bar'

import './globals.css'
import { SiteAppearance } from '@homestuck/cms/components/site-appearance'
import { SiteFooter } from '@homestuck/cms/components/site-footer'
import { SiteHeader } from '@homestuck/cms/components/site-header'
import { ThemeProvider } from '@homestuck/ui/providers/ThemeProvider'

// import configPromise from '#payload.config'

// const getSiteConfiguration = cache(async () => {
//   const payload = await getPayload({ config: configPromise })
//   const siteConfiguration = await payload.findGlobal({
//     slug: 'site-configuration',
//   })
//   return siteConfiguration
// })

// export async function generateMetadata(): Promise<Metadata> {
//   const { meta } = await getSiteConfiguration()

//   return {
//     description: meta?.description ?? 'Example website placeholder description.',
//     title: meta?.title ?? 'Website',
//   }
// }

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  const { isEnabled } = await draftMode()
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={'class'}>
          <SiteAppearance />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
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
