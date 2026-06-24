FROM node:20-alpine AS base
WORKDIR /usr/src/app

FROM base AS builder
COPY package.json .
COPY tsconfig.json .
COPY src/ .
RUN yarn install
RUN yarn build

FROM base AS dependencies
COPY package.json .
RUN yarn install --production

FROM base AS production
COPY --from=builder /usr/src/app/dist/ ./dist
COPY --from=dependencies /usr/src/app/node_modules/ ./dist/node_modules
EXPOSE 3000
ENV SO_PORT=3000
CMD [ "node", "dist/app.js" ]
