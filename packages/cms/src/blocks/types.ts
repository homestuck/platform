import type { Config } from '#payload.types'
import type { Block, BlockSlug } from 'payload'

export type BlockCatalog = {
  [K in BlockSlug]: BlockElement<K>
}

export type BlockConfig = Record<string, Block>

export type BlockData = DataFromBlockSlug<BlockSlug>

export type BlockElement<TSlug extends BlockSlug> = React.FC<DataFromBlockSlug<TSlug>>

export type DataFromBlockSlug<TSlug extends BlockSlug> = Config['blocks'][TSlug]
