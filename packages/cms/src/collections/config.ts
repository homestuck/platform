import type { CollectionConfig } from 'payload'

import { Pages } from './Pages/config'
import { Permissions } from './Permissions/config'
import { Roles } from './Roles/config'
import { Stories } from './Stories/config'
import { Users } from './Users/config'

export const collectionConfigs = [Pages, Permissions, Roles, Stories, Users] as CollectionConfig[]
