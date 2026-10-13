import type { DocsContainerProps } from '@storybook/addon-docs/blocks'

import type { FC, PropsWithChildren } from 'react'
import * as React from 'react'

import { DARK_MODE_EVENT_NAME } from '@storybook-community/storybook-dark-mode'
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks'
import { addons } from 'storybook/preview-api'
import { themes } from 'storybook/theming'

const channel = addons.getChannel()

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({ children, context }) => {
  const [isDark, setDark] = React.useState<boolean>()

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark)
    return () => {
      channel.off(DARK_MODE_EVENT_NAME, setDark)
    }
  }, [])

  return (
    <BaseContainer context={context} theme={isDark ? themes.dark : themes.light}>
      {children}
    </BaseContainer>
  )
}
