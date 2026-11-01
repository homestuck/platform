import type { CollectionConfig } from 'payload'

import { Pages } from './Pages/config'
import { Roles } from './Roles/config'
import { Stories } from './Stories/config'
import { Users } from './Users/config'

export const collectionConfigs = [Pages, Roles, Stories, Users] as CollectionConfig[]
