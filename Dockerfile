FROM node:14-alpine as base
WORKDIR /usr/src/app

FROM base as builder
COPY package.json .
COPY tsconfig.json .
COPY src/ .
RUN yarn install
RUN yarn build

FROM base as dependencies
COPY package.json .
RUN yarn install --production

FROM base as production
COPY --from=builder /usr/src/app/dist/ ./dist
COPY --from=dependencies /usr/src/app/node_modules/ ./dist/node_modules
EXPOSE 3000
ENV SO_PORT 3000
CMD [ "node", "dist/app.js" ]
