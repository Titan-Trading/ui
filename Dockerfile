FROM node:16

WORKDIR /var/www/html

COPY ./package*.json ./
COPY ./tsconfig.json ./

COPY . .

RUN yarn install

RUN yarn production