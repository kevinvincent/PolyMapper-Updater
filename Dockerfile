FROM node:10-alpine

# ubuntu setup
RUN apk update
RUN apk upgrade
RUN apk add --update bash git openssh

# setup working directory
WORKDIR /usr/src/app
COPY /updater .
RUN npm install;
CMD [ "npm", "run", "all" ]
