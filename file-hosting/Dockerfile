FROM node:18-alpine

WORKDIR /app

RUN mkdir -p public

COPY package*.json .
RUN npm install

COPY . .

CMD npm run dev