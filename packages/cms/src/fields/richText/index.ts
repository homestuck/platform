import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'
import type { RichTextField as PayloadRichTextField } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { deepMerge } from 'payload'

export type RichTextField = (args?: Args) => PayloadRichTextField

type Args = {
  // oxlint-disable-next-line typescript/no-explicit-any
  editorFeaturesOverrides?: FeatureProviderServer<any, any, any>[]
  overrides?: Partial<PayloadRichTextField>
}

export const richTextField: RichTextField = ({
  editorFeaturesOverrides = [],
  overrides = {},
} = {}) =>
  deepMerge<PayloadRichTextField>(
    {
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [...rootFeatures, ...editorFeaturesOverrides],
      }),
      label: false,
      localized: false,
      name: 'richText',
      type: 'richText',
    },
    overrides,
  )
