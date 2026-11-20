import { BlocksRenderer } from '#blocks'
import { getCachedGlobal } from '#utils/getGlobal'

export async function SiteHeader() {
  const { layout } = await getCachedGlobal('site-header', 1)
  return (
    <header
      className={'group/header @container/header flex w-full flex-col items-center justify-center'}>
      {layout ? <BlocksRenderer blocks={layout} /> : null}
    </header>
  )
}
