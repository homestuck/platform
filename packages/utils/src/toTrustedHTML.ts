import type { CSSSelector } from '@homestuck/types'

import { toKebabCase } from './toKebabCase'

/**
 * Formats a given `CSSSelector` object to a `TrustedHTML` string.
 *
 * @example
 *   toTrustedHTML({ ':root': { backgroundColor: '#ff0000' } }) // { ':root': { backgroundColor: '#ff0000' } } -> ':root {\r\n  background-color: #ff0000;\r\n}'
 *
 * @param value The `CSSSelector` object to format.
 * @returns {string} The CSS styles as a `TrustedHTML` string.
 */
export const toTrustedHTML = (value?: CSSSelector): TrustedHTML => {
  if (!value) return ''

  function iterator(selector: CSSSelector, depth = 1): string {
    return Object.entries(selector)
      .reduce<string[]>((acc, [key, value]) => {
        return typeof value === 'string' || typeof value === 'number'
          ? [...acc, `${'  '.repeat(depth)}${toKebabCase(key)}: ${String(value)};`]
          : [...acc, `${key} {`, iterator(value as CSSSelector, depth + 1), '}']
      }, [])
      .join('\r\n')
  }

  return iterator(value)
}
