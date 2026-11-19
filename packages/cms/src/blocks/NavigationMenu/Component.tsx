import type { BlockElement } from '#blocks/types'
import type { NavigationMenuBlock } from '#payload.types'

import * as UI from '@homestuck/ui/navigation-menu'

import { BlocksRenderer } from '#blocks'

export const NavigationMenu: BlockElement<NavigationMenuBlock> = ({ content }) => {
  return content ? (
    <UI.NavigationMenu>
      <BlocksRenderer blocks={content} />
    </UI.NavigationMenu>
  ) : null
}
