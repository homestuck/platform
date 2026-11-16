import type { BlockElement } from '#blocks/types'
import type { RichTextBlock } from '#payload.types'

import React from 'react'

import { RichText as PayloadRichText } from '@homestuck/cms/components/rich-text'

export const RichText: BlockElement<RichTextBlock> = ({ richText }) => {
  return (
    <div className={'w-full max-w-full px-8 antialiased @lg:w-lg'}>
      {richText && <PayloadRichText data={richText} />}
    </div>
  )
}
