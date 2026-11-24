import type { StoryPage } from '#payload.types'
import type { Slugify } from 'payload/shared'

import { slugify } from 'payload/shared'

export const slugifyStoryPage: Slugify<StoryPage> = async ({
  data: { parentStory: parentStoryFromProps, pageNumber },
  req,
}) => {
  const parentStory =
    typeof parentStoryFromProps === 'string'
      ? await req.payload.findByID({
          collection: 'stories',
          depth: 0,
          id: parentStoryFromProps,
          overrideAccess: true,
          select: {
            slug: true,
          },
        })
      : parentStoryFromProps

  const parentStorySlug = parentStory.slug

  return slugify(`${parentStorySlug}-${String(pageNumber)}`)
}
