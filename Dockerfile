FROM node:12-alpine
RUN npm i -g serve
WORKDIR /var/app

ENV NODE_ENV production

COPY lerna.json package.json yarn.lock .yarnclean ./
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/dtos/package.json ./packages/dtos/
COPY ./packages/ui/package.json ./packages/ui/
RUN yarn --production

COPY ./ ./

