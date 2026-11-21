import { BlocksRenderer } from '@homestuck/cms/blocks/blocks-renderer'

import { getCachedDocumentBySlug } from '#utils/getDocument'

type PageProps = {
  slug: string
}

export async function Page({ slug }: PageProps) {
  const page = await getCachedDocumentBySlug('pages', slug)

  const { layout = [] } = page ?? {}

  return layout && layout.length > 0 ? <BlocksRenderer blocks={layout} /> : null
}
