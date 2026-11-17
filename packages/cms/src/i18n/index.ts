import type { CustomTranslationsKeys } from './types'
import type { ClientTranslationKeys } from '@payloadcms/translations'
import type { LabelFunction } from 'payload'

export { translations } from './config'

type TranslationFunction<TKeys = CustomTranslationsKeys> = (key: TKeys) => LabelFunction

export const t: TranslationFunction =
  (key) =>
  ({ t }) =>
    t(key as ClientTranslationKeys)
