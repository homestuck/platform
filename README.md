<div align="center">

![@homestuck/platform](packages/assets/public/svg/platform/default.svg)

# @homestuck/platform

<img alt="GitHub License" src="https://img.shields.io/github/license/homestuck/platform?style=flat-square">
<img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/homestuck/platform/ci.yaml?style=flat-square">

<a href="https://discord.gg/homestuck" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/1404836696909938820?style=flat-square&logo=discord&logoColor=white&label=&color=5865F2"></a>
<a href="https://x.com/homestuck" target="_blank"><img alt="Static Badge" src="https://img.shields.io/badge/Follow%20on%20X-black?style=flat-square&logo=x"></a>
<a href="https://bsky.app/profile/homestuck.com" target="_blank"><img alt="Bluesky" src="https://img.shields.io/badge/Follow%20on%20Bluesky-black?style=flat-square&logo=bluesky&logoColor=white&label=&color=1185FE"></a>
</div>

## About This Repository

The `@homestuck/platform` repository is a monorepo workspace for shared configurations, published
packages, and applications maintained by Homestuck Inc., et al. It provides reusable assets, styles,
UI components, and configuration for projects within the _Homestuck_ and broader _MSPaintAdventures_
ecosystems.

## What's Included

The following [`@homestuck`](https://github.com/homestuck) scoped packages are included in this
monorepo:

### Tooling

- [`@homestuck/oxfmt-config`](./packages/oxfmt-config) — Shared Oxfmt configuration for consistent
  formatting.
- [`@homestuck/oxlint-config`](./packages/oxlint-config) — Shared Oxlint configurations for
  consistent linting.
- [`@homestuck/tsconfig`](./packages/tsconfig) — Shared TypeScript compiler configurations.

### Packages

- [`@homestuck/assets`](./packages/assets) — Reusable shapes, symbols, and fonts.
- [`@homestuck/env`](./packages/env) — T3-Env environment variable schemas and validations.
- [`@homestuck/styles`](./packages/styles) — CSS and Tailwind CSS styles.
- [`@homestuck/tokens`](./packages/tokens) — Design Token Community Group specification-compliant
  tokens.
- [`@homestuck/types`](./packages/types) — Shared Typescript type definitions for workspace
  packages.
- [`@homestuck/ui`](./packages/ui) — Shared React UI components, blocks, hooks, and component
  styles.
- [`@homestuck/utils`](./packages/utils) — Shared utility function library for workspace packages.

### Apps

- [`@homestuck/design-system`](./apps/design-system) — Design system documentation website powered
  by Storybook.js.

## Getting Started

### System Requirements

For local development, install the following tools:

- [pnpm](https://pnpm.io/) `>=12.x`
- [Node.js](https://nodejs.org/) `>=24.10.x`

You can use the repository's [Dev Container](./.devcontainer) instead of installing Node.js and pnpm
on your host. The Dev Container requires [Docker](https://www.docker.com/) and the
[Dev Containers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

### Local Development

Once cloned into the repository, install dependencies with pnpm:

```sh
pnpm install
```

### Dev Container

1. Install Docker and the Dev Containers extension for VS Code.
2. Open the repository in VS Code.
3. Run `Dev Containers: Reopen in Container` from the Command Palette.
4. Wait for the container to finish running `pnpm install`.

The container uses Node.js 24 and pnpm 12 and mounts the repository into the workspace.
