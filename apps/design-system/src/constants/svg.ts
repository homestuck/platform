import type { SVGKey } from '@homestuck/assets/types'

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
