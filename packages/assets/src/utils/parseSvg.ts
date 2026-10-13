import type { ParsedSVG, ParsedSVGVariant, RawSVG, RawSVGVariants } from '../types'

import { existsSync } from 'node:fs'
import path from 'node:path'

import { SVG_PUBLIC_DIR, SVG_VARIANT_PRIORITY } from '../constants'
import { convertJsxToReactNodes } from './convertJsxToReactNodes'
import { convertSvgToInnerJsx } from './convertSvgToInnerJsx'
import { extractAttributesFromSvg } from './extractAttributesFromSvg'
import { readFileToString } from './readFileToString'

/**
 * Parse every variant declared for an SVG, once, for use by the ESM generator. The "default" key
 * always maps to the primary SVG (default -> color -> mono -> ... fallback) so `<SVG />` renders
 * unchanged. Additional declared variants (mono, wordmark, light, dark, ...) are added when their
 * SVG file exists and parses. Returns null when no SVG is found.
 */
export function parseSvg(svg: RawSVG): null | ParsedSVG {
  const { variants } = svg
  const rawSvgVariants = Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [
      key,
      value ? path.join(SVG_PUBLIC_DIR, value) : value,
    ]),
  ) as RawSVGVariants

  const primarySvgVariantPath = getPrimarySvgVariantPath(rawSvgVariants)

  if (!primarySvgVariantPath) return null

  const parsedVariants: Record<string, ParsedSVGVariant> = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    default: parseSvgVariant(primarySvgVariantPath)!,
  }

  for (const [key, path] of Object.entries(rawSvgVariants)) {
    if (key === 'default' || !path) continue
    const parsed = parseSvgVariant(path)
    if (parsed) {
      // If a mono SVG explicitly declares fill="none" on its root (uncommon
      // but valid), override to currentColor. The general case (no fill attr)
      // is already handled by extractRootSvgPaint returning "currentColor".
      if (key === 'mono' && parsed.fill === 'none') {
        parsed.fill = 'currentColor'
      }
      parsedVariants[key] = parsed
    }
  }

  const parsedSvg = {
    keys: Object.keys(parsedVariants),
    variants: parsedVariants,
  }

  return parsedSvg
}

/**
 * Parse one variant SVG file. Returns null when the file is missing/empty.
 */
function parseSvgVariant(path: string): null | ParsedSVGVariant {
  const svgContent = readFileToString(path)
  if (!svgContent) return null

  const { fill, stroke, viewBox } = extractAttributesFromSvg(svgContent)
  const innerJsx = convertSvgToInnerJsx(svgContent)

  return { childNodes: convertJsxToReactNodes(innerJsx), fill, stroke, viewBox }
}

/**
 * Extracts the filepath of the primary SVG variant from a raw SVG. The "default" key always maps to
 * the primary SVG (default -> color -> mono -> ... fallback) so `<SVG />` renders unchanged.
 * Additional declared variants (mono, wordmark, light, dark, ...) are added when their SVG file
 * exists and parses. Returns null when no SVG is found.
 */
function getPrimarySvgVariantPath(variants: RawSVGVariants) {
  for (const variant of SVG_VARIANT_PRIORITY) {
    if (variant in variants && variants[variant] && existsSync(variants[variant])) {
      return variants[variant]
    }
  }

  for (const variant in variants) {
    if (variants[variant] && existsSync(variants[variant])) {
      return variants[variant]
    }
  }

  return null
}
