#!/bin/bash
# Use the node 12 version image file
FROM --platform=linux/amd64 node:12
# Create app directory in the image file
WORKDIR /usr/scr/app
# Get the node module package
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# The Application Port
ENV PORT=8080
# Run the Application
CMD ["node", "server.js"]
