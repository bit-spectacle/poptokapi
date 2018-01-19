var express = require('express');
var router = express.Router();

var userService = require('../module/service/UserService');

/* GET home page. */
router.get('/login/:email?/:password?', function(req, res, next) {
    var email = req.params.email;
    var password = req.params.password;
    
    if (email) {
        userService.Login(email, 
            function (user) {
                console.log(user);
                var result = {
                    code: 'FAIL',
                    message: '로그인 실패',
                    user_uid : null
                };
                if(password == user.password)
                {
                    req.session.user_uid = user.userNo;
                    result = {
                        code: 'SUCC',
                        message: '로그인 성공',
                        user_uid : req.session.user_uid
                    };
                    userService.ChangeLastLogin(user.userNo,function(user){
                        console.log(user.lastlogin);
                    });
                }
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(result));
            });
      }
      else {
        var result = {
            code: 'FAIL',
            message: '로그인 실패',
            user_uid : null
        };
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
      }
});

//Join
router.get('/join/:email/:password/:nickname', function(req, res, next){
    var email = req.params.email;
    var password = req.params.password;
    var nickname = req.params.nickname;

    userService.Join(email, password,nickname, function(){
        console.log(email);
        console.log(nickname);
    });
})

module.exports = router;