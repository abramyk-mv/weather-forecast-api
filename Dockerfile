FROM node:12.16

ARG NODE_ENV

WORKDIR /var/web

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "migration:run"]
