var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET helloworld page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World' });
});

/* GET New User page. */
router.get('/newuser', function(req, res){
  res.render('newuser', {title: 'Add New User'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs){
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res){
  // set internal db variable
  var db = req.db;

  // get form values -- these use the "name" attributes
  var userName = req.body.username,
      userEmail = req.body.useremail;

  // Set the collection
  var collection = db.get('usercollection');

  // Submit to the db
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err, doc){
    if (err) {
      // if it failed, return error
      res.send("There was a problem adding info to the database");
    } else {
      res.redirect("userlist");
    }
  });
});

module.exports = router;
