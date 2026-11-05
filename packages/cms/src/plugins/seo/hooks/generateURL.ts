import type { GenerateURL } from '@payloadcms/plugin-seo/types'
import type { CollectionSlug, DataFromCollectionSlug } from 'payload'

import { getServerSideURL } from '#utils/getURL'

export const generateURL: GenerateURL<DataFromCollectionSlug<CollectionSlug>> = ({ doc }) => {
  const baseUrl = getServerSideURL()
  const url = new URL('slug' in doc && typeof doc.slug === 'string' ? doc.slug : '', baseUrl)

  return url.toString()
}
