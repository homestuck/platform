import type { Block, BlockSlug } from 'payload'

import { Archive } from './Archive/config'
import { Form } from './Form/config'
import { RichText } from './RichText/config'

export const blockConfigs = [Archive, Form, RichText] as const satisfies Block[]

export const blockSlugs = blockConfigs.map<BlockSlug>((block) => block.slug)
