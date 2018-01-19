
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

// router.get('/login/:email/:password', function (req, res, next) {

//   var email = req.params.email;
//   var password = req.params.password;

//   if (email) {
//     userService.UserGet(email, function (user) {
//       console.log(user);
//       res.send(JSON.stringify(user));
//     });
//   }
//   else {
//     res.send(null);
//     console.log(email);
//   }
//   // connection.query('select * from user where email = ?', email, function (err, result) {
//   //   if (err) {
//   //     console.log('err : ' + err);
//   //   } else {
//   //     if (result.length === 0) {
//   //       res.json({ success: false, msg: '해당 유저가 존재하지 안ㅎ습니다.' })
//   //     } else {
//   //       if (!bcrypt.compareSync(password, result[0].password)) {
//   //         res.json({ success: false, msg: '비밀번호가 일치하지 않습니다.' })
//   //       } else {
//   //         res.json({ success: true })
//   //       }
//   //     }
//   //   }
//   // });
// });

module.exports = router;