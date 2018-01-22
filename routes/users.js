
'use strict';

var express = require('express');
var router = express.Router();
var userService = require('../module/service/UserService');

var session = require('express-session');
var bodyParser = require('body-parser');

var MySQLStore = require('express-mysql-session')(session);
var app = express();

/* GET users listing. */
router.get('/userinfo/:email', function (req, res, next) {
  var email = req.params.email;
  if (email) {
    userService.UserGet(email, function (user) {
      console.log(user);
      res.send(JSON.stringify(user));
    });
  }
  else {
    res.send(null);
    console.log(email);
  }
});

module.exports = router;