import { StyleDictionary } from 'style-dictionary-utils'

// Custom transform to cleanly omit '$root' or 'root' from the variable name path
StyleDictionary.registerTransform({
  name: 'name/kebab/omit-root',
  transform: (token) => {
    // Filter out '$root' or 'root' from the object path before joining with dashes
    return token.path
      .filter((part) => part !== '$root' && part !== 'root')
      .map((part) => part.toLowerCase())
      .join('-')
  },
  type: 'name',
})

// Custom format to output all tokens keys as string literals
StyleDictionary.registerFormat({
  format: ({ dictionary, file }) => {
    const name = String(file.destination?.split('.')[0])
    return [
      `declare module "${name}" {`,
      `  const ${name}: {`,
      ...dictionary.allTokens.map((token) => `    readonly "${token.name}": string;`),
      `  };`,
      `  export default ${name};`,
      `}`,
    ].join(`\n`)
  },
  name: 'typescript/flat-module-declarations',
})

const dictionary = new StyleDictionary({
  log: {
    verbosity: 'verbose',
  },
  platforms: {
    css: {
      buildPath: 'src/styles',
      files: [
        {
          destination: 'colors.css',
          filter: 'isColor',
          format: 'css/advanced',
        },
        {
          destination: 'gradients.css',
          filter: 'isGradient',
          format: 'css/advanced',
        },
      ],
      transformGroup: 'css',
      transforms: ['name/kebab/omit-root', 'gradient/css'],
    },
    ts: {
      buildPath: 'dist',
      files: [
        {
          destination: 'colors.js',
          filter: 'isColor',
          format: 'javascript/esm',
          options: {
            flat: true,
          },
        },
        {
          destination: 'colors.d.ts',
          filter: 'isColor',
          format: 'typescript/flat-module-declarations',
        },
        {
          destination: 'gradients.js',
          filter: 'isGradient',
          format: 'javascript/esm',
          options: {
            flat: true,
          },
        },
        {
          destination: 'gradients.d.ts',
          filter: 'isGradient',
          format: 'typescript/flat-module-declarations',
        },
      ],
      transformGroup: 'css',
      transforms: ['name/kebab/omit-root', 'gradient/css'],
    },
  },
  source: [
    'node_modules/@homestuck/tokens/color.tokens.json',
    'node_modules/@homestuck/tokens/gradient.tokens.json',
  ],
})

await dictionary.buildAllPlatforms()
