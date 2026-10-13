import type svgData from './data/svg.json'

import type { PascalCase } from '@homestuck/types'

// ---------------------------------------------------------------------------
// JSX -> createElement-descriptor conversion
// ---------------------------------------------------------------------------

export type CjsNode = {
  children: (CjsNode | string)[]
  props: Record<string, Record<string, string> | string>
  type: string
}

// ---------------------------------------------------------------------------
// SVG reading & parsing
// Types mirrored from svgs.json shape
// ---------------------------------------------------------------------------

/**
 * An SVG's full variant set: every selectable variant parsed once.
 */
export type ParsedSVG = {
  keys: string[] // Ordered variant keys, always starting with "default".
  variants: Record<string, ParsedSVGVariant> // Variant key -> parsed SVG. Always contains a "default" entry.
}

/**
 * Pre-parsed SVG data for a single variant, shared between ESM and CJS generators.
 */
export type ParsedSVGVariant = {
  childNodes: (CjsNode | string)[]
  fill: string
  stroke?: string
  viewBox: string
}

export type RawSVG = {
  aliases: string[]
  categories: string[]
  copyright: string
  license: string
  slug: string
  title: string
  variants: RawSVGVariants
}

export type RawSVGVariants = {
  [key: string]: string | undefined
  dark?: string
  default?: string
  light?: string
}

export type SVGReactComponent<T extends SVGComponentProps = SVGComponentProps> = (
  args: SVGComponentProps & T,
) => React.ReactSVGElement

// ---------------------------------------------------------------------------
// SVG React
// ---------------------------------------------------------------------------

export type SVGComponentProps = React.SVGProps<SVGSVGElement>

// ---------------------------------------------------------------------------
// SVG -> JSX conversion
// ---------------------------------------------------------------------------

export type SVGPaintAttributes = {
  fill: string
  stroke?: string
}

export type SVGSlug = keyof typeof svgData

export type SVGKey = PascalCase<SVGSlug>

export type SVGReactCatalog = Record<SVGKey, SVGReactComponent>

export default SVGReactCatalog
