import type { ReactRenderer } from '@storybook/nextjs-vite'

import { withThemeByDataAttribute } from '@storybook/addon-themes'

export const ThemeDecorator = withThemeByDataAttribute<ReactRenderer>({
  attributeName: 'data-theme',
  defaultTheme: 'MSPaintAdventures',
  themes: {
    MSPaintAdventures: 'mspa',
    'shadcn/ui': 'shadcn',
  },
})
