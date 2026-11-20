import { BlocksRenderer } from '@homestuck/cms/blocks/blocks-renderer'

import { getCachedDocumentBySlug } from '#utils/getDocument'

type PageProps = {
  slug: string
}

export async function Page({ slug }: PageProps) {
  const { layout } = await getCachedDocumentBySlug('pages', slug)

  return layout ? <BlocksRenderer blocks={layout} /> : null
}
