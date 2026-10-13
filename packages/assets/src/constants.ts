import path from 'node:path'

/**
 * Root of the @homestuck/assets package
 */
export const ROOT_DIR = path.resolve(import.meta.dirname, '../')
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
export const DIST_DIR = path.join(ROOT_DIR, 'dist')
export const SVG_PUBLIC_DIR = path.join(PUBLIC_DIR, 'svg')
export const SVG_DIST_DIR = path.join(DIST_DIR, 'svg')
export const REACT_SVG_DIST_DIR = path.join(SVG_DIST_DIR, 'react')
export const SVG_DATA_FILE = path.join(ROOT_DIR, 'src/data/svg.json')
export const SVG_VARIANT_PRIORITY = [
  'default',
  'color',
  'mono',
  'light',
  'dark',
  'wordmark',
] as const
