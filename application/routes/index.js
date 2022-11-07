var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Ashley Ching" });
});*/

router.get("/", function(req, res){
  res.render("index", {title: 'Home Page'});
});

router.get("/login", function(req, res){
  res.render('login', {title: 'Login'});
});

router.get("/registration", function(req, res){
  res.render('registration', {title: 'Registration'});
});

router.get("/postimage", function(req, res){
  res.render('postimage', {title: 'Post Image'});
});

router.get("/viewpost", function(req, res){
  res.render('viewpost', {title: 'View Post'});
});



module.exports = router;
