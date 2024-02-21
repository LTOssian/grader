FROM node:21-alpine as build

WORKDIR /home/app

COPY package*.json .

# Dev target
FROM build as dev

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start:dev" ]

FROM build as prod_build

RUN npm ci 

COPY . .

RUN npm run build

# Prod target
FROM prod_build as prod

WORKDIR /home/app

COPY --from=prod_build /home/app/dist ./dist

COPY package*.json .

RUN npm ci --only=production

EXPOSE 4001

CMD [ "npm", "run", "start:prod" ]
