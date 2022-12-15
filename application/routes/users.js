const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const db = require('../conf/database');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/registration', function(req, res, next){
  const {username, email, password} = req.body;

  // server side validation

  // check for duplicate username
  db.query('SELECT id FROM users WHERE username=?', [username])
    .then(function([results, fields]) {
      if (results && results.length == 0) {
        // check fr duplicate email
        return db.query('SELECT id FROM users WHERE email=?', [email]);
      } else {
        throw new Error('username already exists');
      }
    })
    .then(function([results, fields]) {
      if (results && results.length == 0) {
      // hashbrowns and salt
        return bcrypt.hash(password, 2);
      } else {
        throw new Error('email already exists');
      }
    })
    .then(function(hashedPassword) {
      // insert into database
      return db.query('INSERT INTO users (username, email, password) VALUE (?, ?, ?)', [username, email, hashedPassword]);
    })
    .then(function([results, fields]) {
      if (results && results.affectedRows == 1) {
        res.redirect('/login');
      } else {
        throw new Error('user could not be made');
      }
    })
    .catch(function(err) {
      res.redirect('/registration');
      next(err);
    });
});

router.post('/login', function(req, res, next){
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('SELECT id, username, password FROM users WHERE username=?', [username])
    .then(function([results, fields,]) {
        if (results && results.length == 1) {
          loggedUserId = results[0].id;
          loggedUsername = results[0].username;
          let dbPassword = results[0].password;
          return bcrypt.compare(password, dbPassword);
        } else {
          throw new UserError('Failed login: Invalid user credentials', '/login', 200);
        }
    })
    .then(function(passwordsMatched) {
      if (passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash('success', `Hi ${loggedUsername}, you are now logged in.`)
        req.session.save(function(saveErr) {
          res.redirect('/');
        })
      } else {
        throw new UserError('Failed login: Invalid user credentials', '/login', 200);
      }
    })
    .catch(function(err) {
      if (err instanceof UserError) {
        req.flash('error', err.getMessage());
        req.session.save(function(saveErr) {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }
    });
});

router.post('/logout', function(req, res, next) {
  req.session.destroy(function(destroyError) {
    if (destroyError) {
      next(err);
    } else {
      res.json({
        status: 200,
        message: 'You have been logged out'
      });
    }
  })
});

module.exports = router;
