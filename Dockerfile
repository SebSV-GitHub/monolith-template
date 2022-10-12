FROM node:alpine as builder

WORKDIR /app

COPY package*.json .
COPY .npmrc .

ARG GITHUB_PACKAGES_NPM_TOKEN
ENV GITHUB_PACKAGES_NPM_TOKEN=${GITHUB_PACKAGES_NPM_TOKEN}

RUN npm i -g typescript
RUN npm i

COPY src src
COPY types types
COPY tsconfig.json .

RUN tsc -b

RUN rm -rf node_modules

RUN npm i --omit=dev

FROM node:alpine

WORKDIR /app

COPY config/default.json config/default.json
COPY config/production.json config/production.json
COPY --from=builder /app/dist/ src/
COPY --from=builder /app/node_modules/ node_modules/

CMD node src/index.js
