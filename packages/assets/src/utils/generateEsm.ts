import type { ParsedSVG, RawSVG } from '../types'

import { toPascalCase } from '@homestuck/utils/toPascalCase'

/**
 * Runtime helper (shared verbatim by ESM and CJS output, contains no module-format-specific
 * references) that returns a shallow copy of an element's props with every internal id namespaced
 * by prefix `p`:
 *
 * - Id="a" -> id="{p}a"
 * - Fill="url(#a)" -> fill="url(#{p}a)" (any attribute)
 * - Href="#a" -> href="#{p}a"
 * - Style={{ fill:'url(#a)' }} values are remapped too Non-reference values (e.g. fill="#FFF") are
 *   left untouched.
 */
const NAMESPACE_RUNTIME = String.raw`
  function _ns(props, p) {
    var out = {};
    for (var k in props) {
      var v = props[k];
      if (k === 'id') out[k] = p + v;
      else if (k === 'href' && typeof v === 'string' && v.charCodeAt(0) === 35) out[k] = '#' + p + v.slice(1);
      else if (typeof v === 'string') out[k] = v.replace(/url\(#([^)]+)\)/g, function (_m, id) { return 'url(#' + p + id + ')'; });
      else if (v && typeof v === 'object') {
        var s = {};
        for (var sk in v) { var sv = v[sk]; s[sk] = typeof sv === 'string' ? sv.replace(/url\(#([^)]+)\)/g, function (_m, id) { return 'url(#' + p + id + ')'; }) : sv; }
        out[k] = s;
      } else out[k] = v;
    }
    return out;
  }`
// const NAMESPACE_RUNTIME = [
//   `function _ns(props, p) {`,
//   `  var out = {};`,
//   `  for (var k in props) {`,
//   `    var v = props[k];`,
//   `    if (k === 'id') out[k] = p + v;`,
//   `    else if (k === 'href' && typeof v === 'string' && v.charCodeAt(0) === 35) out[k] = '#' + p + v.slice(1);`,
//   String.raw`    else if (typeof v === 'string') out[k] = v.replace(/url\(#([^)]+)\)/g, function (_m, id) { return 'url(#' + p + id + ')'; });`,
//   `    else if (v && typeof v === 'object') {`,
//   `      var s = {};`,
//   String.raw`      for (var sk in v) { var sv = v[sk]; s[sk] = typeof sv === 'string' ? sv.replace(/url\(#([^)]+)\)/g, function (_m, id) { return 'url(#' + p + id + ')'; }) : sv; }`,
//   `      out[k] = s;`,
//   `    } else out[k] = v;`,
//   `  }`,
//   `  return out;`,
//   `}`,
// ].join('\n')

export function generateEsmBarrel(entries: { componentName: string; slug: string }[]): string {
  const lines = [`// @homestuck/assets/svg/react`, `// Auto-generated barrel. Do not edit.`, ``]
  for (const { componentName, slug } of entries) {
    lines.push(`export { default as ${componentName} } from './${slug}.js';`)
  }
  return lines.join('\n')
}

export function generateEsmComponent(icon: RawSVG, parsed: null | ParsedSVG): string {
  const componentName = toPascalCase(icon.slug)

  if (!parsed) {
    return [
      `// @homestuck/assets/svg/react — ${icon.title}`,
      `// Auto-generated. Do not edit.`,
      `// WARNING: SVG source not found for slug "${icon.slug}"`,
      ``,
      `function ${componentName}({ variant, ...props }) {`,
      `  return null;`,
      `}`,
      `${componentName}.displayName = '${componentName}';`,
      ``,
      `export default ${componentName};`,
    ].join('\n')
  }

  const ns = isIdNamespaceRequired(parsed)
  const lines: string[] = [
    `// @homestuck/assets/svg/react — ${icon.title}`,
    `// Auto-generated. Do not edit.`,
    `// Variants: ${parsed.keys.join(', ')}`,
    ``,
    ns ? `import { createElement, useId } from 'react';` : `import { createElement } from 'react';`,
    ``,
    `const _variants = ${JSON.stringify(parsed.variants)};`,
    ``,
  ]
  if (ns) lines.push(NAMESPACE_RUNTIME, ``)
  lines.push(`function ${componentName}({ variant = 'default', viewBox, ...props }) {`)
  if (ns) lines.push(`  const _p = 'tsvg' + useId().replace(/[^a-zA-Z0-9]/g, '') + '-';`)
  lines.push(
    `  const _v = _variants[variant] ?? _variants.default;`,
    `  return createElement(`,
    `    'svg',`,
    `    Object.assign({ viewBox: viewBox ?? _v.viewBox, fill: _v.fill, stroke: _v.stroke, xmlns: 'https://www.w3.org/2000/svg' }, props),`,
    `    ..._v.childNodes`,
    `      .map(function _c(el) {`,
    `        if (typeof el === 'string') return el;`,
    ns
      ? `        return createElement(el.type, _ns(el.props, _p), ...(el.children ?? []).map(_c));`
      : `        return createElement(el.type, el.props, ...(el.children ?? []).map(_c));`,
    `      })`,
    `  );`,
    `}`,
    `${componentName}.displayName = '${componentName}';`,
    ``,
    `export default ${componentName};`,
  )
  return lines.join('\n')
}

/**
 * Detect whether any variant references internal SVG ids (gradients, masks, clipPaths, filters,
 * patterns and their url(#id) / href="#id" references).
 *
 * Such icons MUST namespace their ids per render. SVG ids share the document scope, so when several
 * icons that each declare e.g. id="a" render on the same page, every url(#a) resolves to whichever
 * definition appears first in the DOM, corrupting the colors of the others.
 */
function isIdNamespaceRequired(svg: ParsedSVG): boolean {
  const json = JSON.stringify(svg.variants)
  return json.includes('url(#') || json.includes('"id":') || /"(?:xlink:)?href":"#/.test(json)
}
