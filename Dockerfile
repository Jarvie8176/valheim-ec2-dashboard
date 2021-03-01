FROM node:12-alpine as BUILD
WORKDIR /var/app

COPY lerna.json package.json yarn.lock .yarnclean ./
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/dtos/package.json ./packages/dtos/
COPY ./packages/ui/package.json ./packages/ui/
RUN yarn
COPY ./ ./
RUN yarn build


FROM node:12-alpine
WORKDIR /var/app
ENV NODE_ENV production
RUN npm i -g serve
COPY lerna.json package.json yarn.lock .yarnclean ./
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/dtos/package.json ./packages/dtos/
COPY ./packages/ui/package.json ./packages/ui/
RUN yarn; yarn cache clean --all

COPY --from=BUILD /var/app/packages/api/dist ./packages/api/dist
COPY --from=BUILD /var/app/packages/dtos/dist ./packages/dtos/dist
COPY --from=BUILD /var/app/packages/ui/build ./packages/ui/build
COPY --from=BUILD /var/app/packages/ui/public ./packages/ui/public

COPY ./config/.env ./config/
