import svgData from '@homestuck/assets/catalog/svg'
import { svgCatalog as svgReactCatalog } from '@homestuck/assets/svg/react'
import type { SVGKey, SVGComponentProps, RawSVG } from '@homestuck/assets/types'
import { toPascalCase } from '@homestuck/utils/toPascalCase'

import preview from '#sb/preview'

const catalog = Object.fromEntries(
  Object.entries(svgData as Record<string, RawSVG>)
    .filter(([_Key, value]) => value.categories.includes('FRAF'))
    .map(([Key, value]) => [
      toPascalCase(Key),
      { ...value, Element: svgReactCatalog[Key as SVGKey] },
    ]),
)

// const { ASPECT } = SVG_CATALOG

// type SVGCatalog<T extends SVGKey = SVGKey> = { [K in T]: (typeof svgReactCatalog)[K] }

// const svgCatalog = Object.keys(svg).reduce<SVGCatalog>((acc, key) => {
//   if (ASPECT.includes(key) && key in svg) {
//     acc[key as SVGKey] = svg[key as SVGKey]
//   }
//   return acc
// }, {} as SVGCatalog)

// const catalog = Object.keys(svgReactCatalog).reduce<SVGCatalog>((acc, key) => {
//   // @ts-expect-error -- SVGKey is not string
//   if (ASPECT.includes(key as SVGKey) && key in svgReactCatalog) {
//     acc[key as SVGKey] = svgReactCatalog[key as SVGKey]
//     // acc[key as SVGKey] = (svgReactCatalog as Record<SVGKey, svgCatalog.SVGComponent>)[key as SVGKey]
//   }
//   return acc
// }, {} as SVGCatalog)

const meta = preview.meta({
  argTypes: {
    color: {
      control: 'color',
      if: {
        arg: 'variant',
        eq: 'mono',
      },
    },
    height: {
      table: {
        disable: true,
      },
    },
    name: {
      control: 'select',
      options: Object.keys(catalog),
      type: { name: 'string', required: true },
    },
    variant: {
      control: 'select',
      options: ['default', 'pixel'],
    },
    width: {
      table: {
        disable: true,
      },
    },
  },
  args: { height: 'auto', width: 'auto' },
  render: ({ name, ...args }: SVGComponentProps & { name: SVGKey; variant?: never }) => {
    if (!(name in catalog)) return <></>
    const SVGComponent = catalog[name]?.Element
    if (!SVGComponent) return <></>
    return <SVGComponent {...args} />
  },
  tags: ['!autodocs'],
  title: 'SVG/Fruity Rumpus Asshole Factory',
})

export default meta

export const FrafCrabApple = meta.story({
  args: {
    name: 'FrafCrabApple',
  },
  name: 'Crab Apple',
})
