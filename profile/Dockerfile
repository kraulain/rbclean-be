# build stage
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json .

# npm ci to "clean install" from package-lock.json
RUN npm ci --only=production

COPY --from=build /app/build/ ./build

CMD ["node", "build/app.js"]
