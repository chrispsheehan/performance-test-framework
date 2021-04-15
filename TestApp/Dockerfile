FROM node:11-alpine

WORKDIR /app

COPY ./src ./

RUN npm install

RUN ls

EXPOSE 3000

CMD ["npm", "run", "dev"]
