import { dasherize } from 'inflection'

import type { KebabCase } from '@homestuck/types'

/**
 * Formats a given `string` to kebab case.
 *
 * @example
 *   toKebabCase('fooBar') // 'fooBar' -> 'foo-bar'
 *
 * @param value The string to format.
 * @returns {string} The given string in kebab case.
 */
export const toKebabCase = <T extends string>(value: T): KebabCase<T> =>
  dasherize(value.toLowerCase()) as KebabCase<T>
