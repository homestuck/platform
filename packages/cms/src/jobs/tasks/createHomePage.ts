import type { TaskConfig } from 'payload'

export const createHomePage = {
  handler: async ({ req }) => {
    await req.payload.create({
      collection: 'pages',
      data: {
        slug: 'home',
        title: 'Home',
      },
    })

    return {
      output: {
        pageCreated: true,
      },
    }
  },
  slug: 'createHomePage',
} satisfies TaskConfig
