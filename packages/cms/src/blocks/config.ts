import type { Block, BlockSlug } from 'payload'

import { Archive } from './Archive/config'
import { Form } from './Form/config'
import { RichText } from './RichText/config'

export const blockConfigs: Block[] = [Archive, Form, RichText] as const

export const blockSlugs: BlockSlug[] = blockConfigs.map<BlockSlug>(
  // oxlint-disable-next-line typescript/no-unnecessary-type-assertion
  (block) => block.slug as BlockSlug,
)
