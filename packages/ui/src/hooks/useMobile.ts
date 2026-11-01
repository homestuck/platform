import * as React from 'react'

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${String(mobileBreakpoint - 1)}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    mql.addEventListener('change', onChange)
    onChange()
    return () => {
      mql.removeEventListener('change', onChange)
    }
  }, [mobileBreakpoint])

  return !!isMobile
}
