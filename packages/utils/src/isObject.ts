/**
 * Type guard to narrow an argument as an object.
 *
 * @param value The value to verify as an object.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
