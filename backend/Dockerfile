FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]

# If you are building your code for production
# RUN npm ci --only=production

#############################################
##### using volumes for production 
##############################################
#FROM node:18
#WORKDIR /usr/src/app
#EXPOSE 8080
#CMD [ "./node_modules/nodemon/bin/nodemon.js", "server.js" ]