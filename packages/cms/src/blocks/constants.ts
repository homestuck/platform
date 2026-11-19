import type { BlockCatalog } from './types'

import { Archive as archive } from './Archive/Component'
import { Form as formBlock } from './Form/Component'
import { NavigationMenu as navigationMenu } from './NavigationMenu/Component'
import { NavigationMenuDropdown as navigationMenuDropdown } from './NavigationMenu/Dropdown/Component'
import { NavigationMenuLink as navigationMenuLink } from './NavigationMenu/Link/Component'
import { NavigationMenuList as navigationMenuList } from './NavigationMenu/List/Component'
import { RichText as richText } from './RichText/Component'

export const BLOCK_CATALOG = {
  archive,
  formBlock,
  navigationMenu,
  navigationMenuDropdown,
  navigationMenuLink,
  navigationMenuList,
  richText,
} as const satisfies BlockCatalog
