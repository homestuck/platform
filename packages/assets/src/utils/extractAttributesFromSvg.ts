/**
 * Extract "viewBox=", "fill=", and "stroke=" root attributes from the outer <svg> element.
 *
 * For "fill=":
 *
 * - Explicit fill (any value including "none") is preserved as-is.
 * - No fill + has stroke: "none" (stroke-only icons; fill must not bleed).
 * - No fill + no stroke: "currentColor" so paths inherit the surrounding text color. This is the
 *   correct default for mono icons and multi-color icons whose per-path fills are declared via
 *   "fill=" or "style=" attributes on child elements (they override the root fill regardless).
 *
 * For "stroke=":
 *
 * - Explicit stroke is preserved as-is.
 * - No stroke: Attribute remains unset.
 *
 * For "viewBox=":
 *
 * - Explicit viewBox is preserved as-is.
 * - No viewBox: "0 0 24 24" as a safe fallback.
 */
export function extractAttributesFromSvg(svgContent: string): {
  fill: string
  stroke?: string
  viewBox: string
} {
  const svgTag = /<svg[^>]*>/.exec(svgContent)?.[0]

  if (!svgTag) return { fill: 'currentColor', viewBox: '0 0 24 24' }

  const fillMatch = /\bfill=["']([^"']+)["']/.exec(svgTag)?.[1]
  const strokeMatch = /\bstroke=["']([^"']+)["']/.exec(svgTag)?.[1]
  const viewBoxMatch = /viewBox=["']([^"']+)["']/.exec(svgTag)?.[1]

  return {
    fill: fillMatch ?? (strokeMatch ? 'none' : 'currentColor'),
    stroke: strokeMatch,
    viewBox: viewBoxMatch ?? '0 0 24 24',
  }
}
