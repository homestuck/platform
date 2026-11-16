import type { BlockCatalog, BlockData, BlockElement } from './types'

import { Archive } from './Archive/Component'
import { Form } from './Form/Component'
import { RichText } from './RichText/Component'

const blockCatalog: BlockCatalog = {
  archive: Archive,
  formBlock: Form,
  richText: RichText,
}

export const BlocksRenderer: React.FC<{
  blocks?: BlockData[]
}> = ({ blocks = [] }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null
  return (
    <>
      {blocks.map((block) => {
        const { blockType } = block
        const Block = blockCatalog[blockType] as BlockElement<BlockData<typeof blockType>>
        return <Block {...block} />
      })}
    </>
  )
}
