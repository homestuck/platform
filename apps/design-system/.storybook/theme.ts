import { create } from 'storybook/theming/create'

import { color } from '@homestuck/tokens/color.tokens.json'

export const themeGristLight = create({
  base: 'light',

  /* Typography */
  brandTarget: '_self',
  brandTitle: 'Homestuck Design System',

  /* Base colors */
  colorPrimary: color.strife['50'].$value.hex,
  colorSecondary: color.strife['900'].$value.hex,

  /* UI */
  appBg: color.mspa['100'].$value.hex,
  appBorderColor: color.mspa['700'].$value.hex,
  appBorderRadius: 0,
  appContentBg: '#ffffff',
  appHoverBg: color.strife['50'].$value.hex,
  appPreviewBg: '#ffffff',

  /* Boolean colors */
  booleanBg: color.mspa['100'].$value.hex,
  booleanSelectedBg: color.strife['200'].$value.hex,

  /* Button colors */
  buttonBg: color.mspa['500'].$value.hex,
  buttonBorder: color.mspa['300'].$value.hex,

  /* Text colors */
  textColor: '#000000',
  textInverseColor: '#ffffff',
  textMutedColor: color.mspa['900'].$value.hex,

  /* Toolbar default and active colors */
  barBg: color.mspa['300'].$value.hex,
  barHoverColor: color.strife['50'].$value.hex,
  barSelectedColor: color.strife['200'].$value.hex,
  barTextColor: '#ffffff',

  /* Form colors */
  inputBg: color.mspa['50'].$value.hex,
  inputBorder: color.mspa['300'].$value.hex,
  inputBorderRadius: 0,
  inputTextColor: color.mspa['950'].$value.hex,
})

export const themeGristDark = create({
  base: 'dark',

  /* Typography */
  brandTarget: '_self',
  brandTitle: 'Homestuck Design System',

  /* Base colors */
  colorPrimary: '#6bfa5e',
  colorSecondary: '#1fcd1e',

  /* UI */
  appBg: '#1f2227',
  appBorderColor: '#020306',
  appBorderRadius: 4,
  appContentBg: '#020306',
  appPreviewBg: '#ffffff',

  /* Toolbar default and active colors */
  barBg: '#1f2227',
  barHoverColor: '#83f577',
  barSelectedColor: '#5fce58',
  barTextColor: '#219d26',

  /* Form colors */
  inputBg: '#ffffff',
  inputBorder: '#a8baa5',
})
