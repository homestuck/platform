import type { Config } from '#payload.types'
import type { BlockSlug } from 'payload'

export type BlockCatalog = {
  [K in BlockSlug]: BlockElement<BlockData<K>>
}

export type BlockConfig<TSlug extends BlockSlug = BlockSlug> = Config['blocks'][TSlug]

export type BlockData<TSlug extends BlockSlug = BlockSlug> = BlockConfig<TSlug>

export type BlockElement<TData extends BlockData = BlockData> = React.FC<TData>
