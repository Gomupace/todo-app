FROM node:18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


FROM nginx:1.23.3-alpine

COPY --from=build-step /app/dist/todo-app /usr/share/nginx/html
