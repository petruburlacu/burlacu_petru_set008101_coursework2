const User = require('../models/user');
const jwt = require('jsonwebtoken');
//https://www.npmjs.com/package/jsonwebtoken
const config = require('../config/database');

/** REGISTRATION START **/
module.exports = (router) => {
//DELETE to delete an entry
//PUT to update an entry
//GET to retrieve an entry
  router.post('/register', (req, res) => {
    //res.send('register route working!');
    //req.body.email | req.body.username | req.body.password
    if(!req.body.email && !req.body.username && !req.body.password) { //in case its empty!
      res.json({ success: false, message: 'Please fill in all fields!'});
    }
    else { //will create the user if the fields are filled
     //CREATING NEW User
      let user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }); //from the new imported module
      //save user to database
      user.save((err) => { // Check if error is an error indicating duplicate account
        if(err) {
          if( err.code == 11000 ) {
            res.json({ success: false, message: 'Username or email already exists!'});
          }//duplication error | in case we have it already in database
          else {
            res.json({ success: false, message: 'FAILED to save user: - ', err}); //general error in case its not from matching data
          }
        }
        else {
          res.json({ success: true, message: 'User SAVED'});
        }
      }); //saving the new user in database
      console.log(req.body);

  }

  }); //using .post for routes that need to be secure with a passed data
  /** REGISTRATION END **/

  /** LOGIN START **/
  //using a POST request for Login
    router.post('/login', (req, res) => {
      //res.send('login route working!');
      if(!req.body.username) { //in case its empty!
        res.json({ success: false, message: 'Invalid Username!'});
      }
      else if(!req.body.password) { //in case its empty!
        res.json({ success: false, message: 'Please provide a password!'});
      }
      else {
        //MongoDB db.collection.findOne()
        //checks if username exists in database
        User.findOne({ username: req.body.username }, (err, user) => { //if we get an user error
          if(err) { //if error found
            res.json({ success: false, message: err }); //retirms error
          }
          else {
            if(!user) { //If cant find user
              res.json({ success: false, message: 'Username not found!'});
            }
            else {
              //user found, now checking password
              const currentPassword = user.comparePassword(req.body.password);
              //checks the returned state of the comparePasssword method, if false they dont match!
              if(!currentPassword) {
                res.json({ success: false, message: 'Invalid Password!'});
              }
              else {
                //https://www.npmjs.com/package/jsonwebtoken
                //creating a web token ! they can be decrypted so not putting personal info
                const token = jwt.sign({
                  //comming from user object that we created
                  userId: user._id
                }, config.secret, { expiresIn: '24h' }); //using token from databse, expires in 24hours
                //Can save it for the browser from Angular side
                res.json({ success: true, message: 'All good!', token: token, user: { username: user.username }});
                //providing only username and token
              }
            }
          }
        });
      }
    });
  /** LOGIN END **/

  /** PROFILE ROUTE START **/
  //grab the token from header MIDDLEWARE
  router.use((req, res, next) => {
    const token = req.headers['authentication']; //whenever a request comes from angular 2 and has a header attached
    //it will search for the header
    if(!token) {
      res.json({ success: false, message: 'No token!'});
    }
    //checking for valid token
    else {
      jwt.verify(token, config.secret, (err, decoded) => { //https://www.npmjs.com/package/jsonwebtoken
        if(err) {
          res.json({ success: false, message: 'Invalid Token!'});
        }//token invalid or expired
        else { //token is valid
          req.decoded = decoded;
          next(); //to break out of the execution
        }
      })
    }
  });

  //Using tokens to see what user is loged in
  router.get('/profile', (req, res) => {
    //res.send('Profile route working!');
    //searching user by decoded user id from token
    //show only username and email
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) =>{
      if(err) {
        res.json({ success: false, message: err});
      }//in case we dont find user
      else if (!user) {
        res.json({ success: false, message: 'Invalid user'});
      }
      else {
        res.json({ success: true, user: user }); //sending user back on success
      }
    })
  });
  /** PROFILE ROUTE START **/

  return router; //Returns API routes
}
