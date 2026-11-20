import type { CustomTranslationsKeys } from './types'
import type { ClientTranslationKeys, TFunction } from '@payloadcms/translations'
import type { LabelFunction } from 'payload'

export { translations } from './config'

type TranslationFunction<TKeys = CustomTranslationsKeys> = (
  ...args: Parameters<TFunction<TKeys>>
) => LabelFunction

export const t: TranslationFunction =
  (key, options) =>
  ({ t }) =>
    t(key as ClientTranslationKeys, options)
