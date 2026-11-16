import type { CollectionSlug, GlobalSlug } from 'payload'

type Args = {
  operation: 'GET' | 'REVALIDATE'
  tags: string[]
} & (
  | {
      docType: 'collection'
      slug: CollectionSlug
    }
  | {
      docType: 'global'
      slug: GlobalSlug
    }
)

export const generateLogMessage = ({ docType, operation, slug, tags }: Args) => {
  return `${operation} document from ${docType} <${slug}> with tag(s): [${tags.join(', ')}]`
}
