FROM node:14-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json .
COPY src/ .
RUN yarn install
RUN yarn build

FROM node:14-alpine as dependencies
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --production

FROM node:14-alpine as production
RUN apk update && apk add tor supervisor
COPY torrc.default /etc/tor/torrc
COPY supervisord.conf /etc/supervisord.conf
RUN chown -R tor /etc/tor
USER tor
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist/ ./dist
COPY --from=dependencies /usr/src/app/node_modules/ ./dist/node_modules
EXPOSE 3000
CMD [ "/usr/bin/supervisord" ]
