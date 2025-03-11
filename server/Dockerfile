FROM node:20-alpine

WORKDIR /application

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile --ignore-scripts

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "dev"]
