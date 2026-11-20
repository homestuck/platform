import type { Config } from '#payload.types'
import type { DataFromCollectionSlug } from 'payload'

import { cacheTag } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '#payload.config'

type CollectionSlug = keyof Config['collections']

async function getDocumentBySlug<TSlug extends CollectionSlug = CollectionSlug>(
  collection: TSlug,
  slug: string,
  depth = 1,
): Promise<DataFromCollectionSlug<TSlug>> {
  const payload = await getPayload({ config: configPromise })

  const {
    docs: [doc],
  } = await payload.find({
    collection,
    depth,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return doc
}

export const getCachedDocumentBySlug = async <TSlug extends CollectionSlug = CollectionSlug>(
  collection: TSlug,
  slug: string,
  depth?: number,
) => {
  'use cache'
  cacheTag(`${collection}.slug:${slug}`)
  return await getDocumentBySlug(collection, slug, depth)
}
