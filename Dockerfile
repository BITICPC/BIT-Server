FROM node:13.6-stretch AS build
WORKDIR /app

# Copy necessary files to install dependencies as a distinct layer.
COPY package.json yarn.lock ./
RUN yarn install

# Copy everything else and build.
COPY ./ ./
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]
