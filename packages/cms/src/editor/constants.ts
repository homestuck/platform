import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'

import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  ItalicFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'

export const LEXICAL_EDITOR_ROOT_FEATURES = [
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  SubscriptFeature(),
  SuperscriptFeature(),
  ParagraphFeature(),
  HeadingFeature(),
  AlignFeature(),
  IndentFeature(),
  FixedToolbarFeature({
    applyToFocusedEditor: true,
    disableIfParentHasFixedToolbar: true,
  }),
  // oxlint-disable-next-line typescript/no-explicit-any
] as const satisfies FeatureProviderServer<unknown, any, unknown>[]
