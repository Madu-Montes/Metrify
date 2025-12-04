FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g typescript ts-node

RUN chmod +x /usr/local/bin/tsc || true
RUN chmod +x node_modules/.bin/tsc || true

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]
