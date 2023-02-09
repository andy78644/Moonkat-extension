#!/bin/bash
# Use the node 12 version image file
FROM --platform=linux/amd64 node:18
# Create app directory in the image file
WORKDIR /usr/scr/app
# Get the node module package
COPY ./server/package*.json ./
RUN npm install
# Bundle app source
COPY ./server .
# The Application Port
ENV PORT=8080
# Run the Application
CMD ["node", "server.js"]
