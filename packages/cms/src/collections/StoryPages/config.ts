import type {
  CollectionConfig,
  NamedTab,
  NumberField,
  UnnamedGroupField,
  UnnamedTab,
} from 'payload'

import { createFolderField } from 'payload'

import { authenticatedAccess } from '#access/authenticated'
import { draftDocumentAccess } from '#access/draftDocument'
import { everyoneAccess } from '#access/everyone'
import { globalAdminAccess } from '#access/globalAdmin'
import { createdByField } from '#fields/createdBy'
import { publishedAtField } from '#fields/publishedAt'
import { richTextField } from '#fields/richText'
import { slugField } from '#fields/slug'
import { titleField } from '#fields/title'
import { updatedByField } from '#fields/updatedBy'
import { validateIsInteger } from '#hooks/validateIsInteger'
import { t } from '#i18n'

import { STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'
import { slugifyStoryPage } from './utils/slugifyStoryPage'

// import { STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH } from './constants'

const layoutFieldsTab = {
  fields: [
    richTextField({
      overrides: {
        name: 'layout',
      },
    }),
  ],
  label: t('tabs:layout:label'),
} as const satisfies UnnamedTab

const navigationFieldsTab = {
  fields: [],
  label: t('tabs:navigation:label'),
  name: 'navigation',
} as const satisfies NamedTab

const sidebarFields = [
  {
    admin: {
      position: 'sidebar',
    },
    fields: [
      slugField({
        overrides: {
          slugify: slugifyStoryPage,
          useAsSlug: undefined,
        },
      }),
      {
        admin: {
          step: 1,
        },
        min: 1,
        name: 'pageNumber',
        required: true,
        type: 'number',
        validate: validateIsInteger,
      } satisfies NumberField,
      publishedAtField(),
    ],
    type: 'group',
  } as const satisfies UnnamedGroupField,
  createdByField({
    overrides: {
      admin: {
        hidden: false,
        position: 'sidebar',
      },
    },
  }),
  updatedByField({
    overrides: {
      admin: {
        hidden: false,
        position: 'sidebar',
      },
    },
  }),
]

export const StoryPages = {
  access: {
    create: draftDocumentAccess,
    delete: globalAdminAccess,
    read: everyoneAccess,
    readVersions: authenticatedAccess,
    update: draftDocumentAccess,
  },
  admin: {
    defaultColumns: ['title', 'pageNumber', 'updatedAt', 'publishedAt'],
    useAsTitle: 'title',
  },
  fields: [
    titleField(),
    createFolderField({
      relationTo: 'stories',
      required: true,
    }),
    ...sidebarFields,
    {
      tabs: [layoutFieldsTab, navigationFieldsTab],
      type: 'tabs',
    },
  ],
  hierarchy: {
    admin: {
      components: {
        Icon: STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH,
        SmallIcon: STORY_PAGES_HIERARCHY_ICON_COMPONENT_PATH,
      },
      injectSidebarTab: false,
    },
    parentFieldName: 'parentStory',
    // @ts-expect-error --- PayloadCMS bug
    relationTo: ['stories'],
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
