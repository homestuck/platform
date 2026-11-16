import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: SerializedEditorState
}

export function RichText(props: Props) {
  return (
    <ConvertRichText
      // converters={jsxConverters}
      // nodeMap={defaultViews.default?.nodes}
      {...props}
    />
  )
}
