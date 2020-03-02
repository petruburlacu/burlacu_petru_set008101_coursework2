// Default mongoose model
//http://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //configure Mongoose promises
const Schema = mongoose.Schema;//importing shcema from mongoose

  const userSchema = new Schema ({
    email: { type: String, required: true, unique: true }, //type string, required, unique
    username: { type: String, required: true, unique: true }, //type string, required, unique
    password: { type: String, required: true }
  });

  //compares the passwords on login in database
  userSchema.methods.comparePassword = function(password) {
    var passwordState;

    if(password == this.password) { //compare user input and database password
      passwordState = true;
    }
    else {
      passwordState = false;
    }
    return passwordState; //returns true or false after comparing user input and db
  };

module.exports = mongoose.model('User', userSchema); // exporting the user model to use externally
