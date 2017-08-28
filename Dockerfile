FROM node:latest

# directory automatically created
WORKDIR /usr/pandora/app

# install pm2 for launching node app
RUN npm i -g pm2

# install dependencies packages first to utilize docker layer caching
# COPY dest path could be relative to WORKDIR, or absolute. dest dir must end with /
COPY package.json package-lock.json ./
RUN npm install
COPY client/package.json client/package-lock.json client/
RUN cd client && npm install

# copy everything to filesystem of container
COPY . ./

# build react bundle
RUN cd client && npm run build

EXPOSE 80
CMD ["pm2", "start", "--no-daemon", "npm", "--name", "PandoraApp", "--", "start"]
