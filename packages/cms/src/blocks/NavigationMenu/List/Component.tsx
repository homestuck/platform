import type { BlockElement } from '#blocks/types'
import type { NavigationMenuListBlock } from '#payload.types'

import { cn } from 'cn'

import * as UI from '@homestuck/ui/navigation-menu'

import { NavigationMenuDropdown } from '../Dropdown/Component'
import { NavigationMenuLink } from '../Link/Component'

export const NavigationMenuList: BlockElement<NavigationMenuListBlock> = ({ items }) =>
  items ? (
    <UI.NavigationMenuList className={cn('divide-x-1 divide-white')}>
      {items.map((item, index) => (
        <UI.NavigationMenuItem key={item.id ?? index}>
          {item.blockType === 'navigationMenuDropdown' ? (
            <NavigationMenuDropdown {...item} />
          ) : item.blockType === 'navigationMenuLink' ? (
            <NavigationMenuLink {...item} />
          ) : null}
        </UI.NavigationMenuItem>
      ))}
    </UI.NavigationMenuList>
  ) : null
