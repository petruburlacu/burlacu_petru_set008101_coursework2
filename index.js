const express = require('express'); //Web framework
const app = express();//Initializing Express Aplication

const router = express.Router();

const mongoose = require('mongoose'); //Tool to interact with mongoDB
const config = require('./config/database'); //Mongoose Config
const path = require('path');//Node js Package for paths (files)
const authentication = require ('./routes/authentication')(router); //Import Authentication routes
const blog = require ('./routes/blog')(router);//imports Blog routes
const bodyParser = require('body-parser');//https://github.com/expressjs/body-parser
//from github example
//https://www.npmjs.com/package/cors
const cors = require('cors'); //allowing a specific on ! NOT GENERAL
//setting it in corsOptions (method from official website)

//fixing a general issue with mongoose
mongoose.Promise = global.Promise;
//connecting to the uri from database.js and adding option to check for errors
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('FAILED to CONNECT to the Database ', err);
  }
  else {
    console.log('--SECRET WORKING!: ' + config.secret);
    console.log('--Successful CONNECTION to the Databse ' + config.db);
  }
});

//MIDDLEWARE
/* const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 //some legacy browsers (IE11, various SmartTvs) choke on 204
} */
//taking example from above model to set origin
app.use(cors({
  origin: 'http://localhost:4200' //only for development environment, will not be needed after BUILDING the application
}));
app.use(bodyParser.urlencoded({ extended: false})); //https://github.com/expressjs/body-parser
app.use(bodyParser.json()); // parse application/json
//providing access to desired direcotry
app.use(express.static(__dirname + '/client/dist/')); //provides static directory for front end

app.use('/authentication', authentication); //Using authentication for all routes comming from authentication FILE

app.use('/blog', blog);
//anytime a user a get request the app will respond with a res
// using '*' instead of '/' to not use only one route
//will get the result (res) using any route to make sure that users access area that we want
app.get('*', (req, res) => {
  //send index File
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//telling the server to listen on th eport 8080
// http://localhost:8080
app.listen(8080, () => {
  console.log('--Listening on port: 8080');
});
