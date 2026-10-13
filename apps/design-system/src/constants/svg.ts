import type * as svgr from '@homestuck/assets/svg/react'

type SVGKey = keyof typeof svgr

export const SVG_CATALOG = {
  ASPECT: [
    'AspectBlood',
    'AspectBreath',
    'AspectDoom',
    'AspectHeart',
    'AspectHope',
    'AspectLife',
    'AspectLight',
    'AspectMind',
    'AspectRage',
    'AspectSpace',
    'AspectTime',
    'AspectVoid',
  ],
  FRAF: ['FrafCrabApple', 'FrafEurekaLemon', 'FrafKeyLime', 'FrafMandarinOrange'],
  MSPA: ['MspaHeart', 'MspaJasprosesprite', 'MspaReader'],
} as const satisfies Record<string, SVGKey[]>
