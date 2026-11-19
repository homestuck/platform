import type { BlockData, BlockElement } from './types'

import React from 'react'

import { BLOCK_CATALOG } from './constants'

export const BlocksRenderer: React.FC<{
  blocks?: BlockData[]
}> = ({ blocks = [] }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null
  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        const Block = BLOCK_CATALOG[blockType] as BlockElement<BlockData<typeof blockType>>
        return <Block {...block} key={index} />
      })}
    </React.Fragment>
  )
}
