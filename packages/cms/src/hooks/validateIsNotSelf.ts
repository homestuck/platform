import type { Validate } from 'payload'

export const validateIsNotSelf: Validate = (value, { id }) =>
  value === id || 'Document cannot be its own parent'
