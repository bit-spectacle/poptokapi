var express = require('express');
var router = express.Router();
var userService = require('../module/service/UserService');

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

router.get('/login/:email/:password',function(req, res, next){

  var email = req.params.email;
  var password = req.params.password;
  if (email) {
    userService.Login(email, password , function (user) {
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