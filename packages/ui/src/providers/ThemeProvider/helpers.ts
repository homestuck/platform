import type { ThemeMode } from './types'

import { DARK_MEDIA_QUERY, IS_SERVER } from './constants'

export const getFromLocalStorage = (key: string, fallback?: string) => {
  if (IS_SERVER) return undefined

  try {
    return globalThis.localStorage.getItem(key) ?? fallback ?? undefined
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error(error)
  }
}

// TODO: Refactor to replace with #hooks/useLocalStorage
export const saveToLocalStorage = (key: string, value: string) => {
  try {
    globalThis.localStorage.setItem(key, value)
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error(error)
  }
}

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent): ThemeMode => {
  e ??= globalThis.window.matchMedia(DARK_MEDIA_QUERY)
  return e.matches ? 'dark' : 'light'
}

export const disableAnimation = (nonce?: string) => {
  const css = document.createElement('style')
  if (nonce) css.setAttribute('nonce', nonce)
  css.append(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.append(css)

  return () => {
    // Force restyle
    ;(() => globalThis.window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      // document.head.removeChild(css)
      css.remove()
    }, 1)
  }
}
