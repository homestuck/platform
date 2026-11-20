import { Suspense } from 'react'

import { Page as CMSPage } from '@homestuck/cms/components/page'

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

  return (
    <Suspense>
      <CMSPage slug={slug} />
    </Suspense>
  )
}
