FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
ENV PORT=3000
ENV NODE_OPTIONS=--max_old_space_size=2048

CMD [ "npm", "start" ]

FROM development as build

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
