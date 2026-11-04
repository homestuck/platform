// import type { BlockCatalog, BlockData, BlockElement } from './types'

// import React from 'react'

// export const blockCatalog: BlockCatalog = {}

// export const BlocksRenderer: React.FC<{
//   blocks: BlockData[]
// }> = ({ blocks }) => {
//   if (blocks.length === 0) return null

//   return (
//     <>
//       {blocks.map((block) => {
//         const { blockType, id } = block
//         const Block = blockCatalog[blockType] as BlockElement<typeof blockType>

//         return <Block {...block} key={id} />
//       })}
//     </>
//   )
// }
export const BlocksRenderer = () => <></>
