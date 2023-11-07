# Node Base Image
FROM node:20.9.0-alpine3.17 AS build

RUN corepack enable

WORKDIR /svelte/app

# Install app dependencies
COPY .npmrc package.json ./
RUN pnpm install

COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# Serve the app with a minimal node image
FROM node:20.9.0-alpine3.17 AS serve

WORKDIR /svelte/app
# Copy the app from the build stage
COPY --from=build svelte/app/package.json .
COPY --from=build svelte/app/node_modules ./node_modules
COPY --from=build svelte/app/build ./build

EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "build"]
