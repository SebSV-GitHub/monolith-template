FROM node:alpine

WORKDIR /app

COPY package*.json .
COPY .npmrc .

ARG GITHUB_PACKAGES_NPM_TOKEN
ENV GITHUB_PACKAGES_NPM_TOKEN=${GITHUB_PACKAGES_NPM_TOKEN}

RUN npm i --omit=dev

COPY ./config ./config
COPY ./src ./src

CMD [ "npm", "start" ]