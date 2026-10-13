/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */
/*
 * Copyright (c) 2025 thesvg.org
 * Licensed under MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * URL: [https://github.com/glincker/thesvg]
 */

/**
 * Build-components.ts
 *
 * Generates the @homestuck/assets distribution from the monorepo source data. For each SVG, reads
 * the default SVG and emits a typed React component that forwards refs and accepts all standard
 * SVGProps<SVGSVGElement>.
 *
 * Run with: bun run scripts/build-components.ts tsx scripts/build-components.ts
 *
 * Output layout: dist/ {slug}.js ESM component per icon {slug}.d.ts Type declarations per icon
 * index.js ESM barrel (named exports) index.d.ts Type barrel
 */

import type { RawSVG } from '../types'

import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { toPascalCase } from '@homestuck/utils/toPascalCase'

import { generateEsmBarrel, generateEsmComponent } from '#utils/generateEsm'
import {
  generateDtsBarrel,
  generateDtsComponent,
  generateReactSharedTypesDeclaration,
} from '#utils/generateTypesDeclaration'
import { parseSvg } from '#utils/parseSvg'
import { validateOutput } from '#utils/validateOutput'

import {
  DIST_DIR,
  REACT_SVG_DIST_DIR,
  SVG_DATA_FILE,
  SVG_DIST_DIR,
  SVG_PUBLIC_DIR,
} from '../constants'

console.log('Reading svg.json…')
const svgData: Record<string, RawSVG> = JSON.parse(readFileSync(SVG_DATA_FILE, 'utf8')) as Record<
  string,
  RawSVG
>
const svgKeys = Object.keys(svgData)
const svgItems = Object.values(svgData)
console.log(`Found ${svgKeys.length.toString()} icons.`)

// Clean stale output first so components for removed/renamed slugs (orphans)
// don't linger in dist and get shipped or flagged by the validator.
rmSync(DIST_DIR, { force: true, recursive: true })
mkdirSync(REACT_SVG_DIST_DIR, { recursive: true })

const entries: { componentName: string; slug: string }[] = []
let skipped = 0

for (const svg of svgItems) {
  const componentName = toPascalCase(svg.slug)

  const parsedSvg = parseSvg(svg)
  if (!parsedSvg) skipped++

  // Copy .svg files to dist
  for (const [variantName, variantPath] of Object.entries(svg.variants)) {
    if (!variantPath) continue
    const variantFileName =
      variantName === 'default' ? `${svg.slug}.svg` : `${svg.slug}-${variantName}.svg`
    copyFileSync(path.join(SVG_PUBLIC_DIR, variantPath), path.join(SVG_DIST_DIR, variantFileName))
  }

  // Write ESM component (pre-compiled createElement calls)
  writeFileSync(
    path.join(REACT_SVG_DIST_DIR, `${svg.slug}.js`),
    generateEsmComponent(svg, parsedSvg) + '\n',
  )

  // Write type declarations
  writeFileSync(
    path.join(REACT_SVG_DIST_DIR, `${svg.slug}.d.ts`),
    generateDtsComponent(svg, parsedSvg) + '\n',
  )

  entries.push({ componentName, slug: svg.slug })

  if (entries.length % 500 === 0) {
    console.log(`  Processed ${entries.length.toString()} / ${svgKeys.length.toString()}…`)
  }
}

// Shared types
writeFileSync(
  path.join(REACT_SVG_DIST_DIR, 'types.d.ts'),
  generateReactSharedTypesDeclaration() + '\n',
)
writeFileSync(
  path.join(REACT_SVG_DIST_DIR, 'types.js'),
  `// @homestuck/assets/svg/react — shared types (runtime stub, types are declaration-only)\nexport {};\n`,
)

// Barrel files
writeFileSync(path.join(REACT_SVG_DIST_DIR, 'index.js'), generateEsmBarrel(entries) + '\n')

writeFileSync(path.join(REACT_SVG_DIST_DIR, 'index.d.ts'), generateDtsBarrel(entries) + '\n')

console.log(
  `\nDone. Built ${entries.length.toString()} components (${skipped.toString()} had no SVG source).`,
)
if (skipped > 0) {
  console.log(
    `  ${skipped.toString()} icons emitted null placeholder components - check SVG paths.`,
  )
}
console.log(`Output: ${DIST_DIR}`)

// Validate output
const valid = validateOutput()
if (!valid) {
  process.exit(1)
}
