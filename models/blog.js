// Default mongoose model
//http://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose'); //Node tool for MongoDB
mongoose.Promise = global.Promise; //configure Mongoose promises
const Schema = mongoose.Schema;//importing shcema from mongoose

  const blogSchema = new Schema ({
    title: { type: String, required: true }, //type string, required
    body: { type: String, required: true }, //type string, required
    author: { type: String }, //records the posts author
    date: { type: Date, default: Date.now() } //records the date when post wwas created
  });


module.exports = mongoose.model('Blog', blogSchema); // exporting the user model to use externally
