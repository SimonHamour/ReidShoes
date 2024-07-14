FROM node:22-alpine3.19 AS BUILD

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]