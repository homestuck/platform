import type { CollectionSlug, DataFromCollectionSlug } from 'payload'

import Link from 'next/link'
import React from 'react'

import { cn } from 'cn'

import { Button } from '@homestuck/ui/button'

type ReferenceDocument<TSlug extends CollectionSlug = CollectionSlug> = {
  relationTo: TSlug
  value: DataFromCollectionSlug<TSlug> | string | number
}

type CMSLinkProps = {
  appearance?: 'inline' | Parameters<typeof Button>[number]['variant']
  size?: Parameters<typeof Button>[number]['size']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  reference?: ReferenceDocument | null
}

export const CMSLink: React.FC<CMSLinkProps> = ({
  appearance = 'inline',
  type,
  children,
  className,
  label,
  newTab,
  reference,
  url,
  size,
}) => {
  const href =
    type === 'custom'
      ? url
      : type === 'reference' &&
          reference &&
          reference.relationTo &&
          typeof reference.value === 'object' &&
          'url' in reference.value &&
          typeof reference.value.url === 'string'
        ? reference.value.url
        : null

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href ?? ''} {...newTabProps}>
        {label ?? null}
        {children ?? null}
      </Link>
    )
  }

  return (
    <Button
      size={size}
      variant={appearance}
      render={<Link className={cn(className)} href={href ?? ''} {...newTabProps} />}>
      {label ?? null}
      {children ?? null}
    </Button>
  )
}
