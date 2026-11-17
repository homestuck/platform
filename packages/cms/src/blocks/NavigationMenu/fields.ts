import { NavigationMenuDropdown } from './Dropdown/Component'
import { NavigationMenuLink } from './Link/Component'
import { NavigationMenuList } from './List/Component'

// oxlint-disable-next-line typescript/no-explicit-any
export const navigationMenuFields: Partial<Record<'dropdown' | 'link' | 'list', React.FC<any>>> = {
  dropdown: NavigationMenuDropdown,
  link: NavigationMenuLink,
  list: NavigationMenuList,
} as const
