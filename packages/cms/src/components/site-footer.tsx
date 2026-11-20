import { BlocksRenderer } from '#blocks'
import { getCachedGlobal } from '#utils/getGlobal'

export async function SiteFooter() {
  const { layout } = await getCachedGlobal('site-footer')
  return (
    <footer
      className={'group/footer @container/footer flex w-full flex-col items-center justify-center'}>
      {layout ? <BlocksRenderer blocks={layout} /> : null}
      {'Footer'}
    </footer>
  )
}
