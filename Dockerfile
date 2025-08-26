# Stage 1: Build the Angular app

FROM node:18-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build:prod

# Stage 2: Serve the app with Nginx
FROM nginx:1.23-alpine
COPY --from=build /app/dist/ecole-manager /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]