FROM node:20-alpine

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]

EXPOSE ${PORT}
