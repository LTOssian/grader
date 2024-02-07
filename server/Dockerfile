FROM node:21-alpine as build

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY ./src/ .

COPY . .

FROM build as dev

EXPOSE 4001

CMD [ "npm", "run", "dev" ]

FROM build as prod

RUN npm run build

EXPOSE 4001

CMD [ "npm", "run", "start" ]