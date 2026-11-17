'use client'
import type { CustomTranslationsKeys, CustomTranslationsObject } from '#i18n/types'

import { useTranslation } from '@payloadcms/ui'

export const Description = ({ translationKey }: { translationKey: CustomTranslationsKeys }) => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>() // These generics merge your custom translations with the default client translations

  return t(translationKey)
}
