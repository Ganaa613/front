# Stage 1: Build Node.js application
FROM node:18-alpine AS build
RUN yarn config set strict-ssl false

WORKDIR /app

ARG APP_API=/api
ARG APP_TITLE=Product Catalogy
COPY . .
RUN yarn
RUN yarn eslint
RUN yarn build
RUN yarn install --prod

# Stage 2: Build Nginx image
FROM nginx:1.22
WORKDIR /app

COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]