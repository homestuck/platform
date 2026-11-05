import type { Block } from 'payload'

import { BlocksFeature } from '@payloadcms/richtext-lexical'

import { richTextField } from '#fields/richText'

export const RichText = {
  admin: {
    disableBlockName: true,
    group: 'Content Blocks',
  },
  fields: [
    richTextField({
      editorFeaturesOverrides: [
        BlocksFeature({
          blocks: ['archive'],
          inlineBlocks: [],
        }),
      ],
      overrides: {
        label: 'Content',
      },
    }),
  ],
  interfaceName: 'RichTextBlock',
  slug: 'richText',
} as const satisfies Block
