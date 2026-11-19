import type { BlockElement } from '#blocks/types'
import type { NavigationMenuLinkBlock } from '#payload.types'

import * as UI from '@homestuck/ui/navigation-menu'

import { CMSLink } from '#components/cms-link'

export const NavigationMenuLink: BlockElement<NavigationMenuLinkBlock> = ({ link }) => (
  <UI.NavigationMenuLink
    render={<CMSLink {...link} label={'Link!!'} />}
    className={UI.navigationMenuTriggerStyle({ className: 'py-0' })}
  />
)
