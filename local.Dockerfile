#build
FROM node:16 as build

WORKDIR /var/www/html

COPY ./package*.json ./
COPY ./tsconfig.json ./

COPY . .

RUN yarn install
RUN yarn development


# webserver
FROM nginx:stable-alpine

WORKDIR /var/www/html

COPY --from=build /var/www/html/dist /var/www/html

EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]