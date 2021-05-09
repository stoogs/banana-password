FROM node:15.14-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run" , "start"]