# build stage
FROM node:18-alpine AS build_stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json .

COPY --from=build_stage /app/build/ ./build

# npm ci to "clean install" from package-lock.json
RUN npm i --omit=dev

ENV PORT="3001"

CMD ["node", "build/app.js"]
