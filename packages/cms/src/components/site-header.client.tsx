'use client'
import type { SiteHeader as SiteHeaderData } from '#payload.types'

import { BlocksRenderer } from '#blocks'

type SiteHeaderProps = {
  data: SiteHeaderData
}

export function SiteHeaderClient({ data: { layout } }: SiteHeaderProps) {
  return (
    <header
      className={'group/header @container/header flex w-full flex-col items-center justify-center'}>
      {layout ? <BlocksRenderer blocks={layout} /> : null}
      {'Header'}
    </header>
  )
}
