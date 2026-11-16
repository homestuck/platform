import type { CSSStyleSheet } from '@homestuck/types'
import { toTrustedHTML } from '@homestuck/utils/toTrustedHTML'

function StyleSheet({
  data,
  ...props
}: React.ComponentProps<'style'> & {
  data: CSSStyleSheet
}) {
  return (
    <style
      type="text/css"
      dangerouslySetInnerHTML={{ __html: toTrustedHTML(data) }}
      suppressHydrationWarning
      {...props}
    />
  )
}

export { StyleSheet }
