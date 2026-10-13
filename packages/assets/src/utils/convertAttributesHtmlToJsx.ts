import { toCamelCase } from '@homestuck/utils/toCamelCase'

/**
 * Convert SVG attributes to JSX-safe equivalents.
 *
 * - Class -> className
 * - Style="..." -> style={{ ... }} (object form for React)
 * - Kebab-case -> camelCase
 * - Removes xmlns (React adds it automatically)
 * - Converts xlink:href -> href (xlink is deprecated)
 */
export function convertAttributesHtmlToJsx(attr: string, value: string): null | string {
  // Drop all xmlns declarations — React handles xmlns automatically
  if (attr === 'xmlns' || attr.startsWith('xmlns:')) return null

  // Drop Inkscape/Sodipodi-specific attributes (not valid in JSX)
  if (attr.startsWith('inkscape:') || attr.startsWith('sodipodi:')) return null

  // Drop xml:space and other xml: prefixed attributes
  if (attr.startsWith('xml:')) return null

  // Drop namespace-prefixed attributes from Inkscape metadata (dc:, cc:, rdf:)
  if (attr.startsWith('dc:') || attr.startsWith('cc:') || attr.startsWith('rdf:')) return null

  // class -> className
  if (attr === 'class') return `className=${value}`

  // xlink:href -> href
  if (attr === 'xlink:href') return `href=${value}`

  // Leave style="..." as a CSS string so convertJsxToCjs can parse and
  // convert it to a React style object. Pre-converting to JSX object format
  // here breaks convertJsxToCjs which uses a quoted-value regex.
  if (attr === 'style') {
    return `style=${value}`
  }

  // React recognizes data-* and aria-* attributes only when they stay
  // hyphenated. camelCasing them (data-circle -> dataCircle) makes React
  // reject them as unknown DOM props, so leave these untouched.
  if (attr.startsWith('data-') || attr.startsWith('aria-')) {
    return `${attr}=${value}`
  }

  // Convert kebab-case to camelCase
  const camel = toCamelCase(attr)
  return `${camel}=${value}`
}
