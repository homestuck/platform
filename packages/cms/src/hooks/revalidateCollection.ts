import type { CollectionAfterChangeHook, CollectionSlug, DataFromCollectionSlug } from 'payload'

import { revalidateTag } from 'next/cache'

import { generateLogMessage } from '#utils/generateLogMessage'

export const revalidateCollection: CollectionAfterChangeHook<
  DataFromCollectionSlug<CollectionSlug>
> = ({ doc, previousDoc, collection: { slug }, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    const tags = [`${slug}:${doc.id}`]

    if ('id' in previousDoc && previousDoc.id !== doc.id) tags.push(`${slug}:${previousDoc.id}`)

    if ('slug' in doc) {
      tags.push(`${slug}.slug:${doc.slug}`)

      if ('slug' in previousDoc && previousDoc.slug !== doc.slug)
        tags.push(`${slug}.slug:${previousDoc.slug}`)
    }

    payload.logger.info(
      generateLogMessage({ docType: 'collection', operation: 'REVALIDATE', slug, tags }),
    )
    for (const tag of tags) {
      revalidateTag(tag, 'max')
    }
  }
  return doc
}
