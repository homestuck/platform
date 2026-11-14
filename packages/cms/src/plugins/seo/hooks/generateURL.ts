import type { Story, Post } from '#payload.types'
import type { GenerateURL } from '@payloadcms/plugin-seo/types'

import { getServerURL } from '#utils/getServerURL'

type DataWithSEO = Story | Post

export const generateURL: GenerateURL<DataWithSEO> = ({ doc }) => {
  const baseUrl = getServerURL()
  const url = new URL('slug' in doc && typeof doc.slug === 'string' ? doc.slug : '', baseUrl)

  return url.toString()
}
