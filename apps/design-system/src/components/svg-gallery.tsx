import React from 'react'

import { IconGallery, IconItem } from '@storybook/addon-docs/blocks'
import { ExternalLink } from 'lucide-react'

import type { SVGComponent } from '@homestuck/assets/svg/react'
import * as svg from '@homestuck/assets/svg/react'
import { toKebabCase } from '@homestuck/utils/toKebabCase'

const SVGGalleryItem = (props: { args?: unknown; Element: SVGComponent; name: string }) => {
  const { Element, name, ...rest } = props
  const key = toKebabCase(name)

  return (
    <IconItem
      key={key}
      // @ts-expect-error --- Passing Elements instead of string because I can
      name={
        <div className="flex flex-row items-end gap-0.5">
          <code>{`<${name}>`}</code>
          <a href={`/public/svg/${key}.svg`} rel="noreferrer" target="_blank">
            <ExternalLink
              style={{
                height: '0.75rem',
                marginBottom: '0.25rem',
                width: '0.75rem',
              }}
            />
          </a>
          {/* <br />
          <span className="flex flex-row gap-0.5">
            {key}
            <a
              download={`${key}.svg`}
              href={`data:image/svg+xml;base64,${globalThis.btoa(ReactDOMServer.renderToStaticMarkup(<Element />))}`}>
              <DownloadIcon style={{ height: '0.625rem', width: '0.625rem' }} />
            </a>
          </span> */}
        </div>
      }>
      <div className="text-foreground">
        <Element className="icon-item size-8" {...rest} />
      </div>
    </IconItem>
  )
}

export type SVGGalleryProps = {
  StoryKeys: string[]
}

export const SVGGallery = ({ StoryKeys }: SVGGalleryProps) => {
  const SVGItems = Object.entries(svg).filter(
    ([Key, _]) => Key !== 'default' && StoryKeys.includes(Key),
  )
  return (
    <div className="svg-gallery">
      <IconGallery>
        {SVGItems.map(([Key, Element]) => (
          <SVGGalleryItem Element={Element} key={Key} name={Key} />
        ))}
      </IconGallery>
    </div>
  )
}
