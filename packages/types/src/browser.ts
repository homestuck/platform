import type React from 'react'

export type CSSCustomProperty = Record<`--${string}`, string | number | undefined>

export type CSSProperties = React.CSSProperties & CSSCustomProperty

export type CSSSelector = {
  [selector: string]: CSSProperties | CSSSelector
}

export type { CSSSelector as CSSStyleSheet }
