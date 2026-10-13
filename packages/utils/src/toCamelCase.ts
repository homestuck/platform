import { camelize } from 'inflection'

import type { CamelCase } from '@homestuck/types'

/**
 * Formats a given `string` to camel case.
 *
 * @example
 *   toCamelCase('foo-bar') // 'foo-bar' -> 'fooBar'
 *
 * @param value The string to format.
 * @returns {string} The given string in camel case.
 */
export const toCamelCase = <T extends string>(value: T): CamelCase<T> =>
  camelize(value.replaceAll('-', '_'), true) as CamelCase<T>
