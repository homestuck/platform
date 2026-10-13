FROM ghcr.io/pnpm/pnpm:12 AS base
RUN pnpm runtime set node 24 -g

# RUN --mount=type=cache,id=pnpm,target=/workspaces/${localWorkspaceFolderBasename}/node_modules/.pnpm-store pnpm install --frozen-lockfile

# RUN su vscode -c "curl -s https://ohmyposh.dev/install.sh | bash"

# COPY .devcontainer/theme.omp.json /usr/local/share/theme.omp.json
# COPY .devcontainer/docker-init.sh /usr/local/share/docker-init.sh

# Pin the target pnpm major release
# ENV PNPM_VERSION="next-12"
# ENV PNPM_HOME="/home/node/.local/share/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"

# # Download the native Rust binary as the node user
# USER node
# RUN curl -fsSL https://pnpm.io | env PNPM_VERSION=$PNPM_VERSION zsh -
