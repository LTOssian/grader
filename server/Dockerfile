FROM node:21-alpine as build

WORKDIR /home/app

COPY package.json .

RUN npm install

RUN npm run build

# Dev target
FROM build as dev

COPY ./src/ .

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start:dev" ]

# Prod target 
FROM build as prod

COPY ./dist/ .

EXPOSE 4001

CMD [ "npm", "run", "start:prod" ]