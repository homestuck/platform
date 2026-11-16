import type { Validate } from 'payload'

export const validateIsNotSelf: Validate = (value, { id }) => {
  return value !== null &&
    value !== undefined &&
    ((Array.isArray(value) && value.includes(id)) || value === id)
    ? 'Document cannot be its own parent'
    : true
}
