import type { Config } from '#payload.types'
import type { DataFromCollectionSlug, TypedCollectionSelect } from 'payload'

import { cacheTag } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '#payload.config'

type CollectionWithSlugField = Extract<
  Config['collections'][keyof Config['collections']],
  Record<'slug', unknown>
>

type CollectionWithSlugFieldSlug = {
  [K in keyof Config['collections']]: Config['collections'][K] extends CollectionWithSlugField
    ? K
    : never
}[keyof Config['collections']]

async function getDocumentBySlug<
  TSlug extends CollectionWithSlugFieldSlug = CollectionWithSlugFieldSlug,
>(collection: TSlug, slug: string, depth = 1): Promise<DataFromCollectionSlug<TSlug> | null> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find<TSlug, TypedCollectionSelect[TSlug]>({
    collection,
    depth,
    limit: 1,
    overrideAccess: false,
    populate: undefined,
    select: undefined,
    user: null,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return docs.length > 0 ? docs[0] : null
}

export const getCachedDocumentBySlug = async <
  TSlug extends CollectionWithSlugFieldSlug = CollectionWithSlugFieldSlug,
>(
  collection: TSlug,
  slug: string,
  depth?: number,
) => {
  'use cache'
  cacheTag(`${collection}.slug:${slug}`)
  return await getDocumentBySlug(collection, slug, depth)
}
