import type { CustomTranslationsKeys } from './types'
import type { LabelFunction } from 'payload'

export { translations } from './config'

export const t = (key: CustomTranslationsKeys) => {
  return (({ t }) => t(key)) as LabelFunction<CustomTranslationsKeys>
}
