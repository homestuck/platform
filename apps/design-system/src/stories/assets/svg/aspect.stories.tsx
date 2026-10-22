import type { SVGComponentProps } from '@homestuck/assets/svg/react'
import * as svg from '@homestuck/assets/svg/react'
import type { SVGKey } from '@homestuck/assets/types'

import { SVG_CATALOG } from '#constants/svg'
import preview from '#sb/preview'

const { ASPECT } = SVG_CATALOG

type SVGCatalog<T extends SVGKey = SVGKey> = { [K in T]: (typeof svg)[K] }

// const svgCatalog = Object.keys(svg).reduce<SVGCatalog>((acc, key) => {
//   if (ASPECT.includes(key) && key in svg) {
//     acc[key as SVGKey] = svg[key as SVGKey]
//   }
//   return acc
// }, {} as SVGCatalog)

const svgCatalog = Object.keys(svg).reduce<SVGCatalog>((acc, key) => {
  // @ts-expect-error -- SVGKey is not string
  if (ASPECT.includes(key as SVGKey) && key in svg) {
    acc[key as SVGKey] = (svg as Record<SVGKey, svg.SVGComponent>)[key as SVGKey]
  }
  return acc
}, {} as SVGCatalog)

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
      options: ASPECT,
      type: { name: 'string', required: true },
    },
    variant: {
      control: 'select',
      options: ['color', 'default', 'mono'],
    },
    width: {
      table: {
        disable: true,
      },
    },
  },
  args: { height: 'auto', width: 'auto' },
  render: ({ name, ...args }: SVGComponentProps & { name: SVGKey; variant?: never }) => {
    if (!(name in svgCatalog)) return <></>
    const SVGComponent = svgCatalog[name]
    return <SVGComponent {...args} />
  },
  tags: ['!autodocs'],
  title: 'SVG/God Tier Aspects',
})

export default meta

export const AspectBlood = meta.story({
  args: {
    name: 'AspectBlood',
  },
  name: 'Blood',
})

export const AspectBreath = meta.story({
  args: {
    name: 'AspectBreath',
  },
  name: 'Breath',
})

export const AspectDoom = meta.story({
  args: {
    name: 'AspectDoom',
  },
  name: 'Doom',
})

export const AspectHeart = meta.story({
  args: {
    name: 'AspectHeart',
  },
  name: 'Heart',
})

export const AspectHope = meta.story({
  args: {
    name: 'AspectHope',
  },
  name: 'Hope',
})

export const AspectLife = meta.story({
  args: {
    name: 'AspectLife',
  },
  name: 'Life',
})

export const AspectLight = meta.story({
  args: {
    name: 'AspectLight',
  },
  name: 'Light',
})

export const AspectMind = meta.story({
  args: {
    name: 'AspectMind',
  },
  name: 'Mind',
})

export const AspectRage = meta.story({
  args: {
    name: 'AspectRage',
  },
  name: 'Rage',
})

export const AspectSpace = meta.story({
  args: {
    name: 'AspectSpace',
  },
  name: 'Space',
})

export const AspectTime = meta.story({
  args: {
    name: 'AspectTime',
  },
  name: 'Time',
})

export const AspectVoid = meta.story({
  args: {
    name: 'AspectVoid',
  },
  name: 'Void',
})
