FROM node:14

RUN apt-get update

ENV PORT=3000

EXPOSE 3000

WORKDIR /src

COPY [ "package.json", "yarn.lock" ] .

RUN yarn

COPY . .

USER node

CMD [ "yarn", "start" ]