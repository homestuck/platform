import type { RawSVG } from '../types'

import { readFileSync } from 'node:fs'

import { SVG_DATA_FILE } from '../constants'

export const getSvgData = JSON.parse(readFileSync(SVG_DATA_FILE, 'utf8')) as Record<string, RawSVG>
