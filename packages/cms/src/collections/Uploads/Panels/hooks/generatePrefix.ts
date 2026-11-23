import type { Story } from '#payload.types'
import type { CollectionBeforeOperationHook } from 'payload'

const BASE_PREFIX = 'media/images/panels'

export const generatePrefix: CollectionBeforeOperationHook<'panels'> = async ({
  args,
  // oxlint-disable-next-line typescript/no-deprecated -- Hook not using 'read' value for `operation`
  operation,
  req,
}) => {
  // Early exit escape hatches
  if (operation !== 'create') return args
  if (!args.data) return args

  let newPrefix

  if (typeof args.data.storySlug === 'string') {
    newPrefix = [args.data.storySlug, BASE_PREFIX].join('/')
  } else {
    const { slug: storySlug } =
      typeof args.data.parentStory === 'string'
        ? ((await req.payload.findByID({
            collection: 'stories',
            depth: 0,
            id: args.data.parentStory,
            overrideAccess: true,
            select: { slug: true },
          })) as Story)
        : args.data.parentStory

    newPrefix = [storySlug, BASE_PREFIX].join('/')
  }

  if (args.data.prefix !== newPrefix) args.data.prefix = newPrefix

  return args
}
