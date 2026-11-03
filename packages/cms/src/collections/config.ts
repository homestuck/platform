import type { CollectionConfig } from 'payload'

import { Assets } from './Assets/config'
import { Pages } from './Pages/config'
import { Permissions } from './Permissions/config'
import { Posts } from './Posts/config'
import { Roles } from './Roles/config'
import { Stories } from './Stories/config'
import { StoryPages } from './StoryPages/config'
import { Users } from './Users/config'

export const collectionConfigs = [
  Assets,
  Pages,
  Permissions,
  Posts,
  Roles,
  Stories,
  StoryPages,
  Users,
] as CollectionConfig[]
