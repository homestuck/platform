'use client'
import type { SiteFooter as SiteFooterData } from '#payload.types'

import { BlocksRenderer } from '#blocks'

type SiteFooterProps = {
  data: SiteFooterData
}

export function SiteFooterClient({ data: { layout } }: SiteFooterProps) {
  return (
    <footer
      className={'group/footer @container/footer flex w-full flex-col items-center justify-center'}>
      {layout ? <BlocksRenderer blocks={layout} /> : null}
      {'Footer'}
    </footer>
  )
}
