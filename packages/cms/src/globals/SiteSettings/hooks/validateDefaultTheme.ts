import type { RelationshipFieldSingleValidation } from 'payload'

export const validateDefaultTheme: RelationshipFieldSingleValidation = async (
  value,
  { req: { payload } },
) => {
  if (!value) return 'This field is required.'

  const id =
    typeof value === 'string' ? value : typeof value === 'number' ? String(value) : value.value

  const theme = await payload.findByID({
    collection: 'themes',
    id,
  })

  const { hasAllThemeTokens = false } = theme

  return Boolean(hasAllThemeTokens) || 'Default Theme must have values for all tokens.'
}
