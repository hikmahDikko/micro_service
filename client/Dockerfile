#Secify a base image
FROM node:alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

#Install some dependencies
COPY package.json ./
RUN npm install
COPY ./ ./

#Default command
CMD ["npm", "start"]