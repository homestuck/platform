import type { BlockElement } from '#blocks/types'
import type { ScriptBlock } from '#payload.types'

import NextScript from 'next/script'

export const Script: BlockElement<ScriptBlock> = ({ code }) => {
  return <NextScript>{code}</NextScript>
}
