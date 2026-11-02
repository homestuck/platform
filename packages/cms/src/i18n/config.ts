import type { CustomTranslationsObject } from './types'
import type { I18nOptions } from '@payloadcms/translations'

import { en } from '@payloadcms/translations/languages/en'

import enDict from './dictionaries/en.json'

export const translations = {
  en: enDict as CustomTranslationsObject,
}

export const i18nConfig: I18nOptions<CustomTranslationsObject> = {
  fallbackLanguage: 'en' as const,
  supportedLanguages: {
    en,
  },
  translations,
}

export default i18nConfig
