FROM node:10.17

ARG NODE_ENV

WORKDIR /var/web

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "migration:run"]
