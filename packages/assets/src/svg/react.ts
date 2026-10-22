import type { SVGComponent, SVGComponentProps, SVGKey, SVGReactCatalog } from '../types'

import React from 'react'

import { toPascalCase } from '@homestuck/utils/toPascalCase'

import svgData from '../data/svg.json'

const svgComponent = (_: SVGComponentProps) => React.createElement('svg')

export const svgCatalog = Object.fromEntries(
  Object.keys(svgData).map<[SVGKey, SVGComponent]>((Key) => [
    toPascalCase(Key) as SVGKey,
    svgComponent,
  ]),
) as Record<SVGKey, SVGComponent> satisfies SVGReactCatalog

export default svgCatalog
