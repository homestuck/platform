import type { Block, BlockSlug } from 'payload'

import { Archive } from './Archive/config'
import { Form } from './Form/config'
import { NavigationMenu } from './NavigationMenu/config'
import { NavigationMenuDropdown } from './NavigationMenu/Dropdown/config'
import { NavigationMenuLink } from './NavigationMenu/Link/config'
import { NavigationMenuList } from './NavigationMenu/List/config'
import { RichText } from './RichText/config'

export const blockConfigs = [
  Archive,
  Form,
  NavigationMenu,
  NavigationMenuDropdown,
  NavigationMenuLink,
  NavigationMenuList,
  RichText,
] as const satisfies Block[]

export const blockSlugs = blockConfigs.map<BlockSlug>((block) => block.slug)
