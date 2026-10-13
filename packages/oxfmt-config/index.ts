import { defineConfig } from 'oxfmt'

/**
 * @todo Add 'prettier-plugin-sort-json' compatibility when available
 *   {@link https://github.com/oxc-project/oxc/issues/21644}
 * @todo Add '@prettier/plugin-xml' compatibility when available
 *   {@link https://github.com/oxc-project/oxc/issues/18035}
 */
export default defineConfig({
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'end',
  htmlWhitespaceSensitivity: 'css',
  ignorePatterns: [],
  insertFinalNewline: true,
  jsdoc: {
    addDefaultToDescription: true,
    bracketSpacing: false,
    capitalizeDescriptions: true,
    commentLineStrategy: 'multiline',
    descriptionTag: false,
    descriptionWithDot: false,
    keepUnparsableExampleIndent: false,
    lineWrappingStyle: 'greedy',
    preferCodeFences: false,
    separateReturnsFromParam: false,
    separateTagGroups: false,
  },
  jsxSingleQuote: false,
  objectWrap: 'preserve',
  overrides: [],
  printWidth: 100,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  sortImports: {
    customGroups: [
      {
        elementNamePattern: ['react', 'react-**', '@react-**'],
        groupName: 'react-libs',
      },
      {
        elementNamePattern: ['next', 'next/**', 'next-**'],
        groupName: 'next-libs',
      },
      {
        elementNamePattern: ['@homestuck/**', '@homestuck-**'],
        groupName: 'workspace-libs',
      },
    ],
    groups: [
      'type',
      ['react-libs', 'next-libs'],
      'builtin',
      'external',
      'workspace-libs',
      ['internal', 'subpath'],
      ['parent', 'sibling', 'index'],
      'style',
      'unknown',
    ],
    ignoreCase: true,
    internalPattern: ['~/', '@/', '#'],
    newlinesBetween: true,
    order: 'asc',
    partitionByComment: false,
    partitionByNewline: false,
    sortSideEffects: false,
  },
  sortPackageJson: {
    sortScripts: true,
  },
  sortTailwindcss: {
    attributes: ['class', 'className', 'ngClass', 'class:list'],
    config: undefined,
    functions: ['clsx', 'cn', 'cva', 'tw', 'twMerge'],
    preserveDuplicates: false,
    preserveWhitespace: false,
    stylesheet: undefined,
  },
  svelte: false,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
})
