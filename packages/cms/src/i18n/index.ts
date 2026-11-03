import type { CustomTranslationsKeys } from './types'
import type { TFunction } from '@payloadcms/translations'
import type { LabelFunction } from 'payload'

export { translations } from './config'

export const t = (key: CustomTranslationsKeys) =>
  (({ t }) => (t as TFunction<CustomTranslationsKeys>)(key)) as LabelFunction
