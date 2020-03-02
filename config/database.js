//creating a json object

//node js crypto random bytes method for secret
var crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = { //exporting the entire object
  uri: 'mongodb://localhost:27017/mean-blog',
  secret: crypto, //secret code, encription to use in our app(tokens, etc)
  //our server can decript an know it is ours
  db: 'mean-blog'
}
