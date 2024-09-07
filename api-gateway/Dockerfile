# ====> NOTES
# since docker is a virtualizatioin tool, kindof like a Virtual Machine but slightly different, we need to configure
# the dev environment in this VM for the app to be able to run. in our-case that dev environment is the node runtime,
# for JavaScript execution. In most cases, Dockerfiles will have a base-image that sets up this environment.
# Alpine is a light weight linux distro, and has be configured with the node run time on docker hub. Go to dockerhub and
# search for "node" there you'll see available versions of node we could use as a base-image.

# build stage.
FROM node:19-alpine AS build_stage

# The copy comand runs in our file system and moves files to the specified directory in the container (in this case it's almost like how a VM works).
# Also, the trailing "/" matters as it tells docker to create the folder if it does not exist in the root of the container.
# Only copy what we need for the app to run
COPY src /app/
COPY package.json /app/
COPY tsconfig.json /app/

# Next, to execute any commands commands in the container, we have to change into that container, just as how you can "cd" into a directory.
# we specify this movement with the WORKDIR <path> command
WORKDIR /app

# Unlike the COPY command, the RUN command executes in the container
RUN npm install

RUN npm run build

# # production stage
# FROM node:19-alpine AS production

# WORKDIR /app

# COPY package*.json .

# # npm ci to "clean install" from package-lock.json
# RUN npm ci --only=production

# COPY --from=build_stage /app/build/ ./build

CMD ["node", "build/app.js"]
