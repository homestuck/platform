import type { CSSProperties } from 'react'

import { toKebabCase } from './toKebabCase'

/**
 * Formats a given `object` to an array of CSS custom properties.
 *
 * @example
 *   `{ foo: 'bar', biz: 'baz' }` becomes `["--foo: 'bar';", "--biz: 'baz';"]`
 *
 * @param data The object to format.
 * @param prefix An optional string to prepend to each CSS property name. Useful for setting
 *   indentation.
 * @returns {string} A `string` array of CSS custom properties.
 */
export function toCSSPropertyArray(data: Record<string, unknown>, prefix = ''): CSSProperties[] {
  return Object.keys(data)
    .map((key) =>
      typeof data[key] === 'string' || typeof data[key] === 'number'
        ? `${prefix}--${toKebabCase(key)}: ${data[key].toString()};`
        : false,
    )
    .filter(Boolean) as CSSProperties[]
}
