import type { ReactRenderer } from '@storybook/nextjs-vite'
import type { DecoratorFunction } from 'storybook/internal/types'

import { Geist, Geist_Mono } from 'next/font/google'

export type NextFont = {
  className: string
  style: {
    fontFamily: string
    fontStyle?: string
    fontWeight?: number
  }
}
export type NextFontWithVariable = NextFont & {
  variable: string
}

export type StoryDecoratorProps = {
  fonts?: NextFontWithVariable[]
}

const geist = Geist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const fonts = [geist, geistMono]

export const StoryDecorator: DecoratorFunction<ReactRenderer> = (Story) => {
  const fontVariables = fonts.map((font) => font.variable)
  document.documentElement.classList.add(...fontVariables)
  return (
    <div
      className={
        '@container relative mx-auto my-4 flex h-full w-full max-w-lg min-w-2xs items-center justify-center p-8 font-sans'
      }>
      <Story />
    </div>
  )
}
