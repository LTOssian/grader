FROM node:20-alpine as build

WORKDIR /home/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM build as dev

COPY . .

EXPOSE 4200

CMD [ "npm", "run", "start" ]

# Reverse proxy for prod target
FROM nginx:alpine as prod

# # Copy the NGINX configuration file with the reverse proxy settings
COPY nginx.conf /etc/nginx/nginx.conf

# # Copy the built Angular application from the build stage to NGINX's HTML directory
COPY --from=build /home/app/dist/client/browser usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

