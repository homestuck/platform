import type { Block } from 'payload'

import { t } from '#i18n'

export const Archive: Block = {
  fields: [],
  interfaceName: 'ArchiveBlock',
  labels: {
    plural: t('blocks:archive:labelPlural'),
    singular: t('blocks:archive:labelSingular'),
  },
  slug: 'archive',
}
