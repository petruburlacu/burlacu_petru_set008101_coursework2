
 Access development server at: http://localhost:4200

 Access API at: http://localhost:8080
## Development


## Install Angular CLI
	npm install -g @angular/cli

## Install Express (FrameWork for Node.js)
	npm install express --save (in server directory)

## Install body-parser (Node.js body-parsing middleware to parse request parameters)
	npm install body-parser --save

## Using Mongoose to interact with MongoDB from Node.js
	npm install mongoose --save

	https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
	https://www.npmjs.com/package/mongoose

## Bodyparser (Middleware before handlers) req.body
	https://github.com/expressjs/body-parser
	npm install body-parser --save

## Cors NPM for Passing the data from Development server to back end 
	https://www.npmjs.com/package/cors
	in root directory!
	npm install cors --save

## Json WebToken npm -- Talk about web tokens, for user sessions
	https://github.com/auth0/angular-jwt
	npm install jsonwebtoken (MEAN-Blog> root)

## Restricting user access using routes
	https://angular.io/guide/router#component-less-route-grouping-routes-without-a-component

## Nodemon (Not having to restart the server manually after changes)
	npm install -g nodemon

## Robomongo - interface for our database


## Used postman to interact with the requests on the server side between requests and database
	https://www.getpostman.com/apps

## Bootstrap
	Bootswatch for css template: https://bootswatch.com/superhero


*To connect to Node Server from Angular App we need to set the proxy (client/src/proxy.json)
*To interact with MongoDB using Mongoose, we need to define a schema and create a model on server side

------------------------

C:\>npm config get prefix
C:\Users\Nanomechanic\AppData\Roaming\npm

* In case the windows does not recognize the package commands in cmd use:
C:\> PATH=%PATH%;C:\Users\Nanomechanic\AppData\Roaming\npm;

*Nodemon is used just as node index.js to autorefresh after changes
C:\>nodemon index.js



ng g c new-component --module app

client - npm start
app - nodemon index.js
