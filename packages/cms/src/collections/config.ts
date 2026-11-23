import type { CollectionConfig } from 'payload'

import { Contributors } from './Contributors/config'
import { Pages } from './Pages/config'
import { Permissions } from './Permissions/config'
import { Posts } from './Posts/config'
import { Roles } from './Roles/config'
import { Stories } from './Stories/config'
import { StoryPages } from './Stories/StoryPages/config'
import { Tags } from './Tags/config'
import { Themes } from './Themes/config'
import { Typesets } from './Typesets/config'
import { Assets, Audio, Folders, Icons, Panels } from './Uploads/config'
import { Users } from './Users/config'

export const collectionConfigs = [
  Assets,
  Audio,
  Contributors,
  Folders,
  Icons,
  Pages,
  Panels,
  Permissions,
  Posts,
  Roles,
  Stories,
  StoryPages,
  Tags,
  Themes,
  Typesets,
  Users,
] as const satisfies CollectionConfig[]
