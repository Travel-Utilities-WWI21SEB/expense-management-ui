# Node Base Image
FROM node:19.9.0-alpine3.17 AS build

RUN corepack enable

WORKDIR /svelte/app

# Install app dependencies
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Serve the app with a minimal node image
FROM node:19.9.0-slim AS serve

WORKDIR /svelte/app
# Copy the app from the build stage
COPY --from=build svelte/app/package.json .
COPY --from=build svelte/app/node_modules ./node_modules
COPY --from=build svelte/app/build ./build

EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "build"]