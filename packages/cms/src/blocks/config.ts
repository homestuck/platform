import type { Block, BlockSlug } from 'payload'

import { Archive } from './Archive/config'
import { Form } from './Form/config'
import {
  NavigationMenu,
  NavigationMenuDropdown,
  NavigationMenuLink,
  NavigationMenuList,
} from './NavigationMenu/config'
import { RichText } from './RichText/config'
import { Script } from './Script/config'
import { StoryPage } from './StoryPage/config'

export const blockConfigs = [
  Archive,
  Form,
  NavigationMenu,
  NavigationMenuDropdown,
  NavigationMenuLink,
  NavigationMenuList,
  RichText,
  Script,
  StoryPage,
] as const satisfies Block[]

export const blockSlugs = blockConfigs.map<BlockSlug>((block) => block.slug)
