import type { FormFieldSlug } from './types'

import { Text } from './Text/Component'

// oxlint-disable-next-line typescript/no-explicit-any
export const formFields: Partial<Record<FormFieldSlug, React.FC<any>>> = {
  text: Text,
} as const
