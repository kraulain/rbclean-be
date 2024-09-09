# ====> NOTES
# since docker is a virtualizatioin tool, kindof like a Virtual Machine but slightly different, we need to configure
# the dev environment in this VM-like environment (the docker image) for the app to be able to run. in our-case,
# the dev environment we need in the image is the node runtime, for JavaScript execution.
# In most cases, Dockerfiles will have a base-image that sets up this environment.
# Alpine is a light weight linux distro, it's about 19 Mb, and has be configured with the node run time on docker hub.
# Check out node on docker hub here https://hub.docker.com/_/node, you'll see available versions of node we could use as a base-image.
# Going with node 18, for the Alpine linux distro

# implementing multistage builds since we have to build from TS to JS
# checkout this article to have for more context https://chinwendu.medium.com/how-to-dockerize-your-typescript-application-with-multi-stage-build-a-step-by-step-guide-56e7c4274088

# build stage.
FROM node:18-alpine AS build_stage

# Setting work dir to "app" simple means all commands we'll be executing below will happen in "/app" directory of the image's OS, in this case the Alpine distro
WORKDIR /app

# The copy comand runs in our file system and moves files to the specified directory in the image.
# Also, the trailing "/" matters as it tells docker to create the folder if it does not exist in the root of the images.
# Only copying what we need for the app to be built
COPY src/ src/
COPY package.json package.json
COPY tsconfig.json tsconfig.json

# Unlike the COPY command, the RUN command executes in the images environment
RUN npm install

RUN npm run build

# production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json .

# copying what was built in the build stage to the "/build" folder here
COPY --from=build_stage /app/build/ ./build

# to only install normal dependencies and omit devDependencies
RUN npm install --omit=dev

ENV PORT="3000"

CMD ["node", "build/app.js"]
