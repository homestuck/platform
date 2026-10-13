export const defaultSVGAttributes = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'miter',
  xmlns: 'https://www.w3.org/2000/svg',
} as const satisfies React.ComponentProps<'svg'>

export const defaultSVGIconAttributes = {
  ...defaultSVGAttributes,
  height: '1rem',
  stroke: 'currentColor',
  strokeWidth: 0,
  viewBox: '0 0 16 16',
  width: '1rem',
} as const satisfies React.ComponentProps<'svg'>
