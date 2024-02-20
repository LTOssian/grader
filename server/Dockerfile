FROM node:21-alpine as build

WORKDIR /home/app

COPY package*.json .

RUN npm install

# Dev target
FROM build as dev

COPY ./src/ .

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start:dev" ]

FROM build as prod_build

COPY . .

RUN npm run build

# Prod target
FROM node:21-alpine as prod

WORKDIR /home/app

COPY --from=prod_build /home/app/package*.json .

RUN npm install --only=production

COPY --from=prod_build /home/app/dist/ ./dist/

EXPOSE 4001

CMD [ "npm", "run", "start:prod" ]
