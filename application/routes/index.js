const express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostById} = require('../middleware/posts');
const router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:'Ashley Ching' });
});*/

router.get('/', getRecentPosts, function(req, res){
  res.render('index', {title: 'Home Page', js: ['photos']});
});

router.get('/login', function(req, res){
  res.render('login', {title: 'Login'});
});

router.get('/registration', function(req, res){
  res.render('registration', {title: 'Registration', js: ['registration']});
});

router.get('/postimage', isLoggedIn, function(req, res){
  res.render('postimage', {title: 'Post Image'});
});

router.get('/posts/:id(\\d+)', getPostById, getCommentsForPostById, function(req, res){
  res.render('viewpost', {title: 'View Post'});
});

module.exports = router;
