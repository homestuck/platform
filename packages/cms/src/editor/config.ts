import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { LEXICAL_EDITOR_ROOT_FEATURES } from './constants'

export const editorConfig = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
    hideGutter: true,
    hideInsertParagraphAtEnd: true,
  },
  features: () => [...LEXICAL_EDITOR_ROOT_FEATURES],
})
