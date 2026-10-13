/**
 * Find the index of the matching close tag in `html` for a given `tagName`, correctly handling
 * nested elements of the same type. Returns -1 if no matching close tag is found.
 */
export function findMatchingCloseTag(html: string, tagName: string): number {
  const openRe = new RegExp(String.raw`<${tagName}(?:\s[^>]*)?>`, 'g')
  const closeRe = new RegExp(`</${tagName}>`, 'g')
  let depth = 1
  let pos = 0

  while (depth > 0 && pos < html.length) {
    openRe.lastIndex = pos
    closeRe.lastIndex = pos

    const openMatch = openRe.exec(html)
    const closeMatch = closeRe.exec(html)

    if (!closeMatch) return -1 // No more close tags

    if (openMatch && openMatch.index < closeMatch.index) {
      // Check if the open tag is self-closing
      if (!openMatch[0].endsWith('/>')) {
        depth++
      }
      pos = openMatch.index + openMatch[0].length
    } else {
      depth--
      if (depth === 0) return closeMatch.index
      pos = closeMatch.index + closeMatch[0].length
    }
  }

  return -1
}
