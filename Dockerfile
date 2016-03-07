# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Matt Duffield

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

# Provides cached layer for node_modules 
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD ./src /src

# Expose port
#EXPOSE 1883

# Run app using node
CMD ["node", "/src/server.js"]

