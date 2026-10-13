import type { ParsedSVG, RawSVG } from '../types'

import { toPascalCase } from '@homestuck/utils/toPascalCase'

export function generateDtsBarrel(entries: { componentName: string; slug: string }[]): string {
  const lines = [
    `// @homestuck/assets/svg/react`,
    `// Auto-generated type barrel. Do not edit.`,
    ``,
    `export type { SVGComponent, SVGComponentProps } from './types.js';`,
    ``,
  ]
  for (const { componentName, slug } of entries) {
    lines.push(`export { default as ${componentName} } from './${slug}.js';`)
  }
  return lines.join('\n')
}

export function generateDtsComponent(icon: RawSVG, parsed: null | ParsedSVG): string {
  const componentName = toPascalCase(icon.slug)
  // Per-icon union of the variants that actually resolved. Falls back to
  // "default" so the prop is always present and typed, even for null icons.
  const variantKeys = parsed && parsed.keys.length > 0 ? parsed.keys : ['default']
  const variantUnion = variantKeys.map((k) => `'${k}'`).join(' | ')
  return [
    `// @homestuck/assets/svg/react — ${icon.title}`,
    `// Auto-generated. Do not edit.`,
    ``,
    `import type { SVGComponent, SVGComponentProps } from './types.js';`,
    ``,
    `export type ${componentName}Variant = ${variantUnion};`,
    ``,
    `export interface ${componentName}Props extends SVGComponentProps {`,
    `  /** Which icon variant to render. Defaults to "default". */`,
    `  variant?: ${componentName}Variant;`,
    `}`,
    ``,
    `declare const ${componentName}: SVGComponent<${componentName}Props>;`,
    `export default ${componentName};`,
  ].join('\n')
}

export function generateReactSharedTypesDeclaration(): string {
  return [
    `// @homestuck/assets/svg/react — shared types`,
    `// Auto-generated. Do not edit.`,
    ``,
    `import type * as React from 'react';`,
    ``,
    `export type SVGComponentProps = React.SVGProps<SVGSVGElement>;`,
    ``,
    `export type SVGComponent<T extends SVGComponentProps = SVGComponentProps> = (`,
    `  args: SVGComponentProps & T,`,
    `) => React.ReactSVGElement;`,
  ].join('\n')
}
