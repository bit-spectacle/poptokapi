
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
  

  if (req.session !=null && req.session.user != null) {
    var email = req.params.email;
    if (email && email == req.session.user.email) {
      userService.UserGet(email, function (user) {
        console.log(user);
        var result = {
          code: 'SUCC',
          message: '로그인유지중',
          data: user
        };
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
      });
    }
    else {
      var result = {
        code: 'FAIL',
        message: '실패',
        data: null
      };
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    }
  }
  else {
    var result = {
      code: 'FAIL',
      message: '실패',
      data: null
    };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  }
});

router.get('/friend/:userNo', function (req, res, next) {
  var userNo = req.params.userNo;
  var result = {
    code : 'FAIL',
    message : '실패',
    data : null
  };

  


});

module.exports = router;