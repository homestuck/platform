import type enDict from './dictionaries/en.json'
import type { NestedKeysStripped, SupportedLanguages } from '@payloadcms/translations'
import type { enTranslations } from '@payloadcms/translations/languages/en'

export type CustomTranslationsObject = typeof enDict & typeof enTranslations

export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>
export type Languages = keyof SupportedLanguages
