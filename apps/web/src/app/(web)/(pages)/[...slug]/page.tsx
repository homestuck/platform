import { draftMode } from 'next/headers'
import { cache } from 'react'

import { getPayload } from 'payload'

import { BlocksRenderer } from '@homestuck/cms/blocks/blocks-renderer'

import configPromise from '#payload.config'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })

//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => {
//       return doc.slug !== 'home'
//     })
//     .map(({ slug }) => {
//       return { slug: slug.split('/') }
//     })

//   return [['home'], ...params]
// }

const getPageBySlug = cache(async ({ slug }: { slug: string }) => {
  'use cache'
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return docs[0] ?? null
})

type Props = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise

  const { slug: slugArray = ['home'] } = params

  const encodedSlug = slugArray.join('/')

  const slug = decodeURIComponent(encodedSlug)

  const page = await getPageBySlug({ slug })

  const blockData = page?.layout ?? []

  return <BlocksRenderer blocks={blockData} />
}
