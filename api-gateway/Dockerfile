# build stage

FROM node AS build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node AS production
WORKDIR /app
# RUN npm ci --only=production
COPY --from=build /app/build/ ./build

CMD ["node", "build/app.js"]