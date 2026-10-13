import { existsSync, readFileSync } from 'node:fs'

/**
 * Read a file given its path relative to the project root (e.g.
 * "/src/exports/svg/mspa-reader.svg"). Returns empty string on miss.
 */
export function readFileToString(filePath: string): string {
  if (!existsSync(filePath)) return ''
  return readFileSync(filePath, 'utf8').trim()
}
