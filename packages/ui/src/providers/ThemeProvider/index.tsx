'use client'

import type { Attribute, Theme as ThemeType, ThemeProviderProps, UseThemeProps } from './types'

import * as React from 'react'

import { DARK_MEDIA_QUERY, THEME_MODES } from './constants'
import {
  disableAnimation,
  getFromLocalStorage,
  getSystemTheme,
  saveToLocalStorage,
} from './helpers'

const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = { setTheme: (_) => null, themeModes: [] }

const Theme = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themeModes = ['dark', 'light'],
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
  // oxlint-disable-next-line no-unused-vars
  scriptProps,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = React.useState<ThemeType>(
    () => getFromLocalStorage(storageKey, defaultTheme) ?? 'light',
  )
  const [resolvedTheme, setResolvedTheme] = React.useState(() =>
    theme === 'system' ? getSystemTheme() : theme,
  )

  const attrs = value ? Object.values(value) : themeModes

  const applyTheme = React.useCallback(
    (theme?: ThemeType) => {
      let resolved = theme
      if (!resolved) return

      // If theme is system, resolve it before setting theme
      if (theme === 'system' && enableSystem) {
        resolved = getSystemTheme()
      }

      const name = value ? value[resolved] : resolved
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null
      const { documentElement } = document

      const handleAttribute = (attr: Attribute) => {
        if (attr === 'class') {
          documentElement.classList.remove(...attrs)
          if (name) documentElement.classList.add(name)
        } else if (attr.startsWith('data-')) {
          if (name) {
            documentElement.setAttribute(attr, name)
          } else {
            documentElement.removeAttribute(attr)
          }
        }
      }

      if (Array.isArray(attribute)) {
        for (const item of attribute) {
          handleAttribute(item)
        }
      } else handleAttribute(attribute)

      if (enableColorScheme) {
        const fallback = Object.values<string>(THEME_MODES).includes(defaultTheme)
          ? defaultTheme
          : null
        const colorScheme = Object.values<string>(THEME_MODES).includes(resolved)
          ? resolved
          : fallback

        documentElement.style.colorScheme = colorScheme ?? 'normal'
      }

      enable?.()
    },
    [nonce],
  )

  const setTheme = React.useCallback((value: ThemeType | ((prevState: ThemeType) => ThemeType)) => {
    if (typeof value === 'function') {
      setThemeState((prevTheme) => {
        const newTheme = value(prevTheme)

        saveToLocalStorage(storageKey, newTheme ?? '')

        return newTheme
      })
    } else {
      setThemeState(value)
      saveToLocalStorage(storageKey, value ?? '')
    }
  }, [])

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system')
      }
    },
    [theme, forcedTheme],
  )

  // Always listen to System preference
  React.useEffect(() => {
    const media = globalThis.window.matchMedia(DARK_MEDIA_QUERY)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addEventListener('change', handleMediaQuery)
    handleMediaQuery(media)

    return () => {
      media.removeEventListener('change', handleMediaQuery)
    }
  }, [handleMediaQuery])

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      if (e.newValue) {
        setThemeState(e.newValue) // Direct state update to avoid loops
      } else {
        setTheme(defaultTheme)
      }
    }

    globalThis.window.addEventListener('storage', handleStorage)
    return () => {
      globalThis.window.removeEventListener('storage', handleStorage)
    }
  }, [setTheme])

  // Whenever theme or forcedTheme changes, apply it
  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  const providerValue = React.useMemo(
    () => ({
      forcedTheme,
      resolvedTheme: theme === 'system' ? resolvedTheme : theme,
      setTheme,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined,
      theme,
      themeModes: enableSystem ? [...themeModes, 'system'] : themeModes,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themeModes],
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      {/* <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          nonce,
          scriptProps,
        }}
      /> */}

      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext

export const ThemeProvider = (props: ThemeProviderProps) => {
  const context = React.useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>
  return <Theme {...props} />
}

// export const ThemeScript = React.memo(
//   ({
//     forcedTheme,
//     storageKey,
//     attribute,
//     enableSystem,
//     enableColorScheme,
//     defaultTheme,
//     value,
//     themes,
//     nonce,
//     scriptProps,
//   }: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) => {
//     const scriptArgs = JSON.stringify([
//       attribute,
//       storageKey,
//       defaultTheme,
//       forcedTheme,
//       themes,
//       value,
//       enableSystem,
//       enableColorScheme,
//     ]).slice(1, -1)

//     const scriptString = `(${String(script.toString())})(${scriptArgs})`

//     return (
//       <script
//         {...scriptProps}
//         suppressHydrationWarning
//         nonce={typeof window === 'undefined' ? nonce : ''}
//         dangerouslySetInnerHTML={{ __html: scriptString }}
//       />
//     )
//   },
// )

// Re-export types
export type * from './types'
