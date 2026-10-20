import { defineMain } from "@storybook/nextjs-vite/node";
import remarkGfm from "remark-gfm";

export default defineMain({
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-links",
    "@storybook-community/storybook-dark-mode",
    "@storybook/addon-themes",
    {
      name: "@unpunnyfuns/swatchbook-addon",
      options: {
        config: {
          cssVarPrefix: "",
          resolver: "@homestuck/tokens/resolver.json",
        },
      },
    },
  ],
  build: {
    test: {
      disableAutoDocs: false,
      disableBlocks: false,
      disableDocgen: false,
      disableMDXEntries: false,
    },
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    menuOnboardingChecklist: false,
    sidebarOnboardingChecklist: false,
  },
  framework: "@storybook/nextjs-vite",
  managerHead: (head) => {
    const meta = {
      description:
        "Grist is a collection of declaration, design, and component library packages to be used for Javascript and Typescript projects themed to Homestuck and MSPaintAdventures use cases.",
      // image: `${process.env.STORYBOOK_URL ?? '.'}/images/grist_banner_1200x630.png`,
      favicon: `./assets/svg/platform/default.svg`,
      image: `./images/grist_banner_1200x630.png`,
    };
    return `
    ${head ?? ""}
    <link rel="icon" type="image/svg+xml" href="${meta.favicon}">
    <meta name="description" content="${meta.description}">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Grist | Storybook">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${meta.image}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Grist | Storybook">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.image}">
  `;
  },
  staticDirs: [{ from: "../node_modules/@homestuck/assets/public", to: "/assets" }],
  // stories: ['../src/stories/**'],
  stories: [
    "../src/stories/*.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))",
    {
      directory: "../src/stories/styles",
      titlePrefix: "@homestuck∕styles",
    },
    {
      directory: "../src/stories/tokens",
      titlePrefix: "@homestuck∕tokens",
    },
    {
      directory: "../src/stories/assets",
      // files: '@(*.docs.mdx|**/*.stories.@(mdx|js|jsx|mjs|ts|tsx))',
      titlePrefix: "@homestuck∕assets",
    },
    {
      directory: "../src/stories/ui",
      titlePrefix: "@homestuck∕ui",
    },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      // optimizeDeps: {
      //   include: ['storybook-dark-mode'],
      // },
    });
  },
});
