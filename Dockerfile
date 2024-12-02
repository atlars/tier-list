# Build
FROM node:20-alpine AS build

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
RUN pnpm install --frozen-lockfile
RUN pnpm nuxi build

# Production
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/.output ./.output

ENV NITRO_PORT=3000
ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=production
ENV NUXT_BROWSER_URL=http://test

EXPOSE 3000

ENTRYPOINT [ "node", ".output/server/index.mjs" ]