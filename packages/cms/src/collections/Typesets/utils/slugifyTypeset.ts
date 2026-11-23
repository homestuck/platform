import type { Typeset } from '#payload.types'
import type { Slugify } from 'payload/shared'

import { slugify } from 'payload/shared'

export const slugifyTypeset: Slugify<Typeset> = ({ data: { title } }) => slugify(`typeset-${title}`)
