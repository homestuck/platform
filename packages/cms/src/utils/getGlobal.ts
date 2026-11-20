import type { Config } from '#payload.types'
import type { DataFromGlobalSlug } from 'payload'

import { cacheTag } from 'next/cache'

import { getPayload } from 'payload'

import configPromise from '#payload.config'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 1): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    depth,
    slug,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
/* export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  }) */

export const getCachedGlobal = async <T extends Global>(slug: T, depth?: number) => {
  'use cache'
  cacheTag(`global_${slug}`)
  return await getGlobal(slug, depth)
}
