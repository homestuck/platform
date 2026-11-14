import type { NumberFieldValidation } from 'payload'

import { number } from 'payload/shared'

export const validateIsInteger: NumberFieldValidation = async (value, options) => {
  const isValidNumber = await number(value, options)

  if (typeof isValidNumber === 'string') return isValidNumber

  return Number.isInteger(value) ? isValidNumber : 'This value must be a whole number (integer).'
}
