'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { cn } from 'cn'

import { translations } from '#i18n'
import { getClientSideURL } from '#utils/getURL'

const baseClass = 'admin-bar'

const collectionLabels = translations.en.collections

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props
  const [show, setShow] = useState(false)
  const segments = useSelectedLayoutSegments()
  const router = useRouter()

  // const collection = segments[0] && segments[0] === 'story' ? 'story-pages' : 'pages'
  const collection = segments[0] ? 'pages' : 'pages'

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn(baseClass, 'bg-primary text-primary-foreground border-border border-b-2 py-2', {
        block: show,
        hidden: !show,
      })}>
      <div className="@container px-2 lg:px-16">
        <PayloadAdminBar
          {...adminBarProps}
          classNames={{
            controls: 'font-medium',
            // logo: 'text-primary-foreground',
            // user: 'text-primary-foreground',
          }}
          cmsURL={getClientSideURL()}
          collectionLabels={{
            plural: collectionLabels[collection].labelPlural,
            singular: collectionLabels[collection].labelSingular,
          }}
          collectionSlug={collection}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={async () => {
            await fetch('/preview?action=exit').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            color: 'unset',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
