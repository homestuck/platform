import type { CjsNode } from '../types'

import { toCamelCase } from '@homestuck/utils/toCamelCase'

import { findMatchingCloseTag } from './findMatchingCloseTag'

/**
 * Very lightweight JSX->createElement-descriptor converter.
 *
 * Returns a plain-object tree that can be JSON-serialised and then reconstructed with
 * React.createElement at runtime.
 *
 * Supports self-closing tags, nested same-type elements (e.g. nested <g>), and text nodes (e.g.
 * <text>Hello</text>).
 */
export function convertJsxToReactNodes(jsxInner: string): (CjsNode | string)[] {
  const nodes: (CjsNode | string)[] = []
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const tagRe = /<([a-z][a-z0-9:.-]*)([^>]*?)(\/?)>/gi

  let remaining = jsxInner

  while (remaining.length > 0) {
    const tagMatch = tagRe.exec(remaining)
    if (!tagMatch) {
      // Remaining text with no more tags - capture as text node
      const text = remaining.trim()
      if (text) nodes.push(text)
      break
    }

    // Capture text before this tag as a text node
    const textBefore = remaining.slice(0, tagMatch.index).trim()
    if (textBefore) nodes.push(textBefore)

    const tagName = tagMatch[1] ?? ''
    const attrsRaw = tagMatch[2]?.trim() ?? ''
    const isSelfClosing = tagMatch[3] === '/'
    const matchEnd = tagMatch.index + tagMatch[0].length

    // Parse attributes from the raw attr string
    const props: Record<string, Record<string, string> | string> = {}
    const attrRe = /([a-z][\w:-]*)=["']([^"']*)["']/gi
    let attrMatch: null | RegExpExecArray
    while ((attrMatch = attrRe.exec(attrsRaw)) !== null) {
      const attrName = attrMatch[1] ?? ''
      const attrVal = attrMatch[2] ?? ''
      if (attrName === 'style') {
        // Convert CSS style string to object for React createElement
        const styleObj: Record<string, string> = {}
        for (const decl of attrVal.split(';').filter((d) => d.trim())) {
          const colonIdx = decl.indexOf(':')
          if (colonIdx === -1) continue
          const cssProp = decl.slice(0, colonIdx).trim()
          const cssVal = decl.slice(colonIdx + 1).trim()
          styleObj[toCamelCase(cssProp)] = cssVal
        }
        props[attrName] = styleObj
      } else {
        props[attrName] = attrVal
      }
    }

    const node: CjsNode = { children: [], props, type: tagName }

    if (isSelfClosing) {
      nodes.push(node)
    } else {
      // Find matching close tag with depth tracking for nested same-type elements
      const afterOpen = remaining.slice(matchEnd)
      const closeIdx = findMatchingCloseTag(afterOpen, tagName)
      if (closeIdx >= 0) {
        const innerContent = afterOpen.slice(0, closeIdx)
        const closeTagLen = `</${tagName}>`.length
        node.children = convertJsxToReactNodes(innerContent)
        nodes.push(node)
        remaining = afterOpen.slice(closeIdx + closeTagLen)
        tagRe.lastIndex = 0
        continue
      } else {
        // No matching close tag found - treat as self-closing
        nodes.push(node)
      }
    }

    remaining = remaining.slice(matchEnd)
    tagRe.lastIndex = 0
  }

  return nodes
}
