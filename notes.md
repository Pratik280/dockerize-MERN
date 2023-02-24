https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
https://www.tutorialspoint.com/mongodb/mongodb_insert_document.htm
https://www.bezkoder.com/docker-compose-nodejs-mongodb/
https://www.mongodb.com/docs/manual/core/databases-and-collections/

// TODO:
- [x] add fake json data make 3 api from it
- [x] make a docker image of it
- [x] attach volume and run container in dev environment + nodemon
- [x] mongo express in compose + connection
- [x] How mongo db workins in docker
- [x] create dbs 
- [ ] Learn about express js folder structure [Blog Rocker - Organize express project structure](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/)
- [ ] create a folder structure for two get apis
------
- [ ] make a real world type api CRUD - 
      - DB : GET/POST/PUT/UPDATE/DELETE
      - Search based filter
      - Sign in/up auth
------
- [ ] start mongo container using user password env vars
- [ ] use dot env in express to connect to db
- [ ] finally use express in docker compose (refer the bezcoer doc)
- [ ] docker on AWS using IAC

# MERN

## Backend - express

```json
[
  {
    "name": "Harry Potter",
    "city": "London",
    "age": 23
  },
  {
    "name": "Don Quixote",
    "city": "Madrid",
    "age": 19
  },
  {
    "name": "Joan of Arc",
    "city": "Paris",
    "age": 41
  },
  {
    "name": "Rosa Park",
    "city": "Alabama",
    "age": 38
  }
]
```

```javascript
'use strict';

const express = require('express');
const mongoose = require('mongoose');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const data = require('./data/data.json');

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  res.json(data)
})


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
```


A. Run locally + docker container

1. initialize working folder
```
npm init -i
```
Install express-js
```
npm install express
```

2. Create a server.js file
```javascript
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
```

Here I have written a simple express code that will show "Hello World" in localhost:8080.

3. Run application
```
node server.js
```

Open browser and visit localhost:8080 where you will "Hello World"

> Our app is working. Now time to Dockerize out app.

B. Dockerizing

Docker will isolate the application, its dependencies and its environment in a box(linux). Docker image is a blueprint which will be used to start a running application in linux like box ie docker container.

1. Create and run docker image.

Create Dockerfile with the following content

```Docker
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
```

Create .dockerignore
```
node_modules
npm-debug.log
```

```
docker build -t express-hello-world .
```
```
docker container run \
--rm \
--detach \
--name express-hello-world \
--publish 8000:8080 \
express-hello-world
```


2. Build and run container for development for development

When you use a bind mount, a file or directory on the host machine is mounted into a container. The file or directory is referenced by its absolute path on the host machine. By contrast, when you use a volume, a new directory is created within Docker’s storage directory on the host machine, and Docker manages that directory’s contents.

- Install nodemon 
```
npm install nodemon
```


Conent in Dockerfile
```Docker
FROM node:18
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "./node_modules/nodemon/bin/nodemon.js", "server.js" ]
```

```
docker container run \
--rm \
--detach \
--name express-hello-world \
--publish 8000:8080 \
--volume $(pwd):/usr/src/app \
express-hello-world
```



------
- src
  - config (db.config.js)
  - middleware (auth, login)
  - routes 
  - controllers
  - models (ORM)
  - services
  - utils
- test
 - unit (same as src ..for each file)
 - integration