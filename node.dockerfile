FROM        node:latest
MAINTAINER  London Grey Team
ENV         NODE_ENV=development
ENV         PORT=3000
COPY        . /var/www
WORKDIR     /var/www
RUN         npm install
EXPOSE      $PORT
ENTRYPOINT  ["npm", "server.js"]