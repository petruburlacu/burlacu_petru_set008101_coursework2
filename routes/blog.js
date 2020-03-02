const User = require('../models/user');//Imports User Schema Model
const jwt = require('jsonwebtoken'); //Imports Blog Schema Model
const Blog = require('../models/blog');
//https://www.npmjs.com/package/jsonwebtoken
const config = require('../config/database');


module.exports = (router) => {

//creating a new blog
  router.post('/newBlog', (req, res) => {
    //res.send('Test works!');

    if(!req.body.title) { //checking for empty fields
      res.json({ success: false, message: 'Invalid Blog Title'});
    }
    else if(!req.body.body) {
      res.json({ success: false, message: 'Invalid Blog Content ( - BODY - )'});
    }
    else if(!req.body.author) {
      res.json({ success: false, message: 'Invalid Blog author'});
    }
    else {
      const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
      });//end create blog object

      blog.save((err) => {
        if(err) { //in case of error on saving
          res.json({ success: false, message: err });
        }
        else { //successful
          res.json({ success: true, message: 'Success'});
        }
      });//end blog save

    }
  });

  router.get('/blogFeed', (req, res) =>{
    //res.send('test feed! WORKS');
    //Using the Blog Model to find All blog posts
    Blog.find({}, (err, blog) => {
      if(err) { //in case of error
        res.json({ success: false, message: err });
      }
      else if(!blog) { //in case of no blogs
        res.json({ success: false, message: 'No posts available at the moment'});
      }
      else {
        res.json({ success: true, blog: blog }); //passing the blog
      }
    }).sort({'_id': -1}); //sort the blog feed
  });

  router.get('/post/:id', (req, res) => {
      //res.send('test single post! WORKS');
      //Looking for specific blog in database
      Blog.findOne({ _id: req.params.id }, (err, blog) => { //params grabs the id from '/post/:id' and sends it to the params.id querry
      if(err) { //in case of error
        res.json({ success: false, message: 'Valid BLOG ID? ' + err }); //for example, blog ID not valid
      }
      else if(!blog) { //in case of no blogs
        res.json({ success: false, message: 'No posts found'});
      }
      else {
        res.json({ success: true, blog: blog }); //passing the blog
      }
      });
  });

//put request for updates
  router.put('/updatePost', (req, res) => {
    //res.send('test single post UPDATE');

    if(!req.body._id) {
      res.json({ success: false, message: 'No BLOG ID found'});
    }
    else {
      Blog.findOne({ _id: req.body._id }, (err, blog) => { //params grabs the id from '/post/:id' and sends it to the params.id querry
        if(err) { //in case of error
          res.json({ success: false, message: 'Valid BLOG ID? ' + err }); //for example, blog ID not valid
        }
        else if(!blog) { //in case of no blogs
          res.json({ success: false, message: 'No posts found'});
        }
        else {
          blog.title = req.body.title;
          blog.body = req.body.body;
          blog.save((err) => {
            if(err) { //in case of error
              res.json({ success: false, message: err }); //for example, blog ID not valid
            }
            else {
              res.json({ success: true, message: 'UPDATED' }); //passing the blog
            }
          });
        }
      });
    }
  });

  router.delete('/deletePost/:id', (req, res) => {
    if(!req.params.id) {
      res.json({ success: false, message: 'ID NOT VALID? ' + err });
    }
    else {
      Blog.findOne({ _id: req.params.id }, (err, blog) => { //params grabs the id from '/post/:id' and sends it to the params.id querry
        if(err) { //in case of error
          res.json({ success: false, message: 'Valid BLOG ID? ' + err }); //for example, blog ID not valid
        }
        else if(!blog) { //in case of no blogs
          res.json({ success: false, message: 'No posts found'});
        }
        else {
          blog.remove((err) => {
            if(err) { //in case of error
              res.json({ success: false, message: err }); //for example, blog ID not valid
            }
            else {
              res.json({ success: true, message: 'DELETED' }); //passing the blog
            }
          });
        }
      });
    }
  });

  return router;
}
