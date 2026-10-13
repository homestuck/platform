/* eslint-disable no-console */

import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import { REACT_SVG_DIST_DIR } from '../constants'

export function validateOutput(): boolean {
  console.log('\nValidating output...')
  let errors = 0
  let totalSampled = 0

  const files = readdirSync(REACT_SVG_DIST_DIR).filter((f) => f.endsWith('.js'))
  const skipFiles = new Set(['index.js', 'types.js'])

  // Sample up to 20 files per extension plus always check barrels
  const sampled = new Set<string>([...skipFiles].filter((f) => files.includes(f)))
  const candidates = files.filter((f) => !skipFiles.has(f))
  const step = Math.max(1, Math.floor(candidates.length / 18))
  for (let i = 0; i < candidates.length && sampled.size < 20; i += step) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sampled.add(candidates[i]!)
  }

  for (const file of sampled) {
    const content = readFileSync(path.join(REACT_SVG_DIST_DIR, file), 'utf8')
    const isComponent = !skipFiles.has(file)

    // Check for TypeScript-only syntax in .js files
    if (/\bimport\s+type\b/.test(content)) {
      console.error(`  FAIL: ${file} contains "import type"`)
      errors++
    }
    if (/\bexport\s+type\s*\{/.test(content)) {
      console.error(`  FAIL: ${file} contains "export type {}"`)
      errors++
    }

    if (content.includes('forwardRef<')) {
      console.error(`  FAIL: ${file} contains generic type params on forwardRef`)
      errors++
    }

    if (isComponent) {
      // Check for raw JSX syntax (should use createElement)
      if (/return\s*(?:\(\s*)?<[a-zA-Z]/.test(content)) {
        console.error(`  FAIL: ${file} contains raw JSX syntax (should use createElement)`)
        errors++
      }

      // Check for malformed nested <svg> tags (from Inkscape exports)
      if (content.includes('<svg=')) {
        console.error(`  FAIL: ${file} contains malformed <svg= (broken namespace cleanup)`)
        errors++
      }

      // Check for XML prolog or Inkscape metadata
      if (content.includes('<?xml')) {
        console.error(`  FAIL: ${file} contains XML prolog`)
        errors++
      }

      // Check for DOCTYPE declarations
      if (/<!DOCTYPE/i.test(content)) {
        console.error(`  FAIL: ${file} contains DOCTYPE declaration`)
        errors++
      }

      // Check for inline <style> blocks
      if (/<style[\s>]/i.test(content)) {
        console.error(`  FAIL: ${file} contains <style> element`)
        errors++
      }
    }
  }

  totalSampled += sampled.size

  if (errors === 0) {
    console.log(`  PASS: Validated ${totalSampled.toString()} files, no issues found.`)
    return true
  }
  console.error(`  ${errors.toString()} validation error(s) found.`)
  return false
}
