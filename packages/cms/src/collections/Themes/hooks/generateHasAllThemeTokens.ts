import type { Theme } from '#payload.types'
import type { FieldHook } from 'payload'

import { THEME_TOKENS } from '../constants'

export const generateHasAllThemeTokens: FieldHook<Theme, boolean, Theme> = ({
  siblingData: { lightMode, darkMode },
}) =>
  Boolean(
    darkMode &&
    lightMode &&
    THEME_TOKENS.every((key) => Object.hasOwn(lightMode, key)) &&
    THEME_TOKENS.every((key) => Object.hasOwn(darkMode, key)),
  )
