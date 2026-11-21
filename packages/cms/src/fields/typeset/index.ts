import type { GroupField } from 'payload'

import { deepMerge } from 'payload'

import { cssStylesField } from '#fields/cssStyles'

import { TYPESET_PREVIEW_FIELD_COMPONENT_PATH } from './constants'

export type TypesetField = (args?: Args) => GroupField

type Args = {
  overrides?: Partial<GroupField>
}

export const typesetField: TypesetField = ({ overrides = {} } = {}) =>
  deepMerge<GroupField>(
    {
      fields: [
        {
          fields: [
            {
              admin: {
                width: '50%',
              },
              fields: [
                {
                  defaultValue: 'Geist',
                  name: 'fontHeading',
                  required: true,
                  type: 'text',
                },
                {
                  defaultValue: 'Geist',
                  name: 'fontBody',
                  required: true,
                  type: 'text',
                },
                {
                  defaultValue: 'Geist Mono',
                  name: 'fontMono',
                  required: true,
                  type: 'text',
                },
                {
                  defaultValue: '15px',
                  name: 'size',
                  required: true,
                  type: 'text',
                },
                {
                  admin: {
                    step: 0.25,
                  },
                  defaultValue: 1.75,
                  min: 0,
                  name: 'leading',
                  required: true,
                  type: 'number',
                },
                {
                  defaultValue: '1.25em',
                  name: 'flow',
                  required: true,
                  type: 'text',
                },
                cssStylesField(),
              ],
              type: 'group',
            },
            {
              admin: {
                components: {
                  Field: TYPESET_PREVIEW_FIELD_COMPONENT_PATH,
                },
                width: '50%',
              },
              name: 'typesetPreview',
              type: 'ui',
            },
          ],
          type: 'row',
        },
      ],
      name: 'typeset',
      type: 'group',
    },
    overrides,
  )
