import type { TaskConfig } from 'payload'

export const createHomePage = {
  handler: async ({ req }) => {
    await req.payload.create({
      collection: 'pages',
      data: {
        slug: 'home',
        title: 'Home',
      },
      overrideAccess: true,
    })

    return {
      output: {
        pageCreated: true,
      },
    }
  },
  slug: 'createHomePage',
} satisfies TaskConfig
