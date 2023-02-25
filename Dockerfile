FROM node:alpine as builder

WORKDIR /app

COPY package.json package.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY .npmrc .npmrc
COPY types types

ARG GITHUB_PACKAGES_NPM_TOKEN
ENV GITHUB_PACKAGES_NPM_TOKEN=${GITHUB_PACKAGES_NPM_TOKEN}

RUN npm i && npm run build

FROM node:alpine

WORKDIR /app

ARG GITHUB_PACKAGES_NPM_TOKEN
ENV GITHUB_PACKAGES_NPM_TOKEN=${GITHUB_PACKAGES_NPM_TOKEN}

COPY .npmrc .npmrc
COPY config config

COPY --from=builder /app/dist /app

COPY package.json package.json
RUN npm i --omit=dev && rm package.json

CMD ["node", "."]
