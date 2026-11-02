import type { FieldHook, TypeWithID } from 'payload'

export const populatePublishedAt: FieldHook<TypeWithID, string | undefined | null, unknown> = ({
  data,
  originalDoc,
  req,
  value,
}) => {
  const status = data && '_status' in data ? data._status : null
  const previousStatus = originalDoc && '_status' in originalDoc ? originalDoc._status : null

  if (status === previousStatus) return value

  if (!(status || previousStatus)) {
    req.payload.logger.error(
      'Can only populate `publishedAt` field for a drafts-enabled collection.',
    )
    return value
  }

  if (status === 'published') {
    value = String(new Date())
  }

  if (status === 'draft') {
    value = ''
  }

  return value
}
