import type { BlockCatalog, BlockData, BlockElement } from './types'

import React from 'react'

import { Archive } from './Archive/Component'
import { Form } from './Form/Component'
import { NavigationMenu } from './NavigationMenu/Component'
import { RichText } from './RichText/Component'

const blockCatalog: BlockCatalog = {
  archive: Archive,
  formBlock: Form,
  navigationMenu: NavigationMenu,
  richText: RichText,
}

export const BlocksRenderer: React.FC<{
  blocks?: BlockData[]
}> = ({ blocks = [] }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null
  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const Block = blockCatalog[blockType] as BlockElement<BlockData<typeof blockType>>
        return <Block {...block} key={index} />
      })}
    </React.Fragment>
  )
}
