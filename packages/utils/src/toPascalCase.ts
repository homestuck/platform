import { camelize } from 'inflection'

import type { PascalCase } from '@homestuck/types'

/**
 * Formats a given `string` to pascal case.
 *
 * @example
 *   toPascalCase('foo-bar') // 'foo-bar' -> 'FooBar'
 *
 * @param value The string to format.
 * @returns {string} The given string in pascal case.
 */
export const toPascalCase = <T extends string>(value: T): PascalCase<T> =>
  camelize(value.replaceAll('-', '_'), false) as PascalCase<T>
