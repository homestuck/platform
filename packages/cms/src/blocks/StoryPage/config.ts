import type { Block } from 'payload'

import { richTextField } from '#fields/richText'

export const StoryPage = {
  fields: [
    richTextField({
      overrides: {
        label: 'Header',
        name: 'header',
      },
    }),
    richTextField({
      overrides: {
        label: 'Content',
        name: 'content',
      },
    }),
    richTextField({
      overrides: {
        label: 'Footer',
        name: 'footer',
      },
    }),
  ],
  interfaceName: 'StoryPageBlock',
  slug: 'storyPageBlock',
} as const satisfies Block
