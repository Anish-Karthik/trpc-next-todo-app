# hey co-pilot write me a dockerfile for this application of next.js 13.5 use npm

FROM node

WORKDIR /src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]


EXPOSE 3000
