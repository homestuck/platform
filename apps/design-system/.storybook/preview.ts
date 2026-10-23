import addonA11y from '@storybook/addon-a11y'
import addonDocs from '@storybook/addon-docs'
import addonLinks from '@storybook/addon-links'
import addonThemes from '@storybook/addon-themes'
import addonVitest from '@storybook/addon-vitest'
import { definePreview } from '@storybook/nextjs-vite'
import addonSwatchbook from '@unpunnyfuns/swatchbook-addon'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import { Autodocs } from '#components/autodocs'
import { DocsContainer } from '#components/docs-container'
import { StoryDecorator } from '#components/story-decorator'
import { ThemeDecorator } from '#components/theme-decorator'
import { themeGristDark, themeGristLight } from '#sb/theme'

import '#styles/globals.css'

export default definePreview({
  addons: [addonVitest(), addonA11y(), addonDocs(), addonLinks(), addonThemes(), addonSwatchbook()],
  argTypes: {
    className: {
      control: false,
      table: {
        readOnly: true,
        type: { summary: 'string' },
      },
    },
    render: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [ThemeDecorator, StoryDecorator],
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    backgrounds: { disable: true },
    controls: {
      exclude: ['className'],
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
      sort: 'requiredFirst',
    },
    darkMode: {
      classTarget: 'html',
      current: 'dark',
      dark: themeGristDark,
      darkClass: 'dark',
      light: themeGristLight,
      lightClass: 'light',
      stylePreview: true,
    },
    docs: {
      container: DocsContainer,
      controls: {
        exclude: ['className'],
        sort: 'requiredFirst',
      },
      page: Autodocs,
      source: {
        dark: true,
      },
      toc: {
        headingSelector: 'h2:not(.sbdocs-subtitle), h3, h4, h5',
      },
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          '@homestuck∕tokens',
          '@homestuck∕styles',
          ['About', 'Colors', ['Gallery'], 'Gradients', ['Gallery'], '*'],
          '@homestuck∕assets',
          ['About', 'SVG', ['Gallery', '*'], '*'],
          '@homestuck∕ui',
          'About',
          'Gallery',
          '*',
        ],
      },
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        galaxyFold: {
          name: 'Galaxy Fold',
          styles: {
            height: '653px',
            width: '280px',
          },
          type: 'mobile',
        },
        pixel6: {
          name: 'Pixel 6',
          styles: {
            height: '915px',
            width: '412px',
          },
          type: 'mobile',
        },
        pixel6Pro: {
          name: 'Pixel 6 Pro',
          styles: {
            height: '892px',
            width: '412px',
          },
          type: 'mobile',
        },
      },
    },
  },
  tags: ['autodocs'],
})
