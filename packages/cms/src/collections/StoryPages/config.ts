import type { CollectionConfig, UnnamedGroupField } from 'payload'

import { publishedAtField } from '#fields/publishedAt'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { t } from '#i18n'

import { STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const sidebarGroupFields = () =>
  ({
    admin: {
      position: 'sidebar',
    },
    fields: [slugField(), publishedAtField()],
    type: 'group',
  }) as UnnamedGroupField

export const StoryPages = {
  admin: {},
  fields: [titleField(), sidebarGroupFields()],
  hierarchy: {
    admin: {
      components: {
        Icon: STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH,
        SmallIcon: STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH,
      },
      injectSidebarTab: false,
    },
    allowHasMany: false,
    collectionSpecific: true,
    parentFieldName: 'story',
  },
  labels: {
    plural: t('collections:story-pages:labelPlural'),
    singular: t('collections:story-pages:labelSingular'),
  },
  slug: 'story-pages',
  versions: {
    drafts: {
      schedulePublish: true,
      validate: true,
    },
  },
} as const satisfies CollectionConfig<'story-pages'>
