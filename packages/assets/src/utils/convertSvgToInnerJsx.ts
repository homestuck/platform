import { convertAttributesHtmlToJsx } from './convertAttributesHtmlToJsx'

/**
 * Parse an SVG string and return JSX-safe inner content (everything between the opening <svg ...>
 * and closing </svg> tags).
 *
 * We intentionally do NOT use a full DOM parser to keep zero runtime deps. The conversion is done
 * with targeted regex replacements that are sufficient for well-formed SVG files produced by design
 * tools / icon libraries.
 */
export function convertSvgToInnerJsx(svgContent: string): string {
  // Strip outer <svg ...> wrapper tags
  let inner = svgContent
    // Remove the opening <svg ...> tag (single-line or multi-line)
    .replace(/^<svg[^>]*>/, '')
    // Remove the closing </svg> tag
    .replace(/<\/svg>\s*$/, '')
    .trim()

  // Strip non-JSX XML/HTML constructs
  inner = inner.replaceAll(/<\?xml[^?]*\?>/g, '') // XML prologs
  inner = inner.replaceAll(/<!DOCTYPE[^>]*>/gi, '') // DOCTYPE declarations
  inner = inner.replaceAll(/<!--[\s\S]*?-->/g, '') // HTML/XML comments

  // Strip elements that are invalid in JSX
  inner = inner.replaceAll(/<sodipodi:[^>]*(?:\/>|>[\s\S]*?<\/sodipodi:[^>]+>)/g, '')
  inner = inner.replaceAll(/<metadata[\s\S]*?<\/metadata>/g, '')
  inner = inner.replaceAll(/<style[\s\S]*?<\/style>/g, '') // Inline CSS <style> blocks
  // Strip RDF/DC/CC namespace elements (from Inkscape metadata)
  inner = inner.replaceAll(/<(rdf|dc|cc):[^>]*(?:\/>|>[\s\S]*?<\/\1:[^>]+>)/g, '')

  // Strip nested <svg> wrappers from Inkscape exports (keep their children)
  inner = inner.replaceAll(/<svg[^>]*>/g, '')
  inner = inner.replaceAll('</svg>', '')

  // Convert attribute names throughout the inner content
  // Match attribute="value" or attribute='value' patterns
  inner = inner.replaceAll(
    /\b([a-z][\w:-]*)=("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/gi,
    (_, attr: string, value: string) => {
      const converted = convertAttributesHtmlToJsx(attr, value)
      return converted ?? ''
    },
  )

  return inner
}
