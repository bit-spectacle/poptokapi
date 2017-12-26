var express = require('express');
var router = express.Router();
var userService = require('../module/service/UserService');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var email = req.query.email;
  if (email) {
    userService.UserGet(email, function (user) {
      console.log(user);
      res.send(JSON.stringify(user));
    });
  }
  else {
    res.send(null);
  }
});

module.exports = router;