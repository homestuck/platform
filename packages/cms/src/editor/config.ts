import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const editorConfig = lexicalEditor({
  admin: {
    hideAddBlockButton: true,
    hideGutter: true,
    hideInsertParagraphAtEnd: true,
  },
})
