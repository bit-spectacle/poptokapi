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
                    data : null
                };
                if(password == user.password)
                {
                    delete user.password;
                    result = {
                        code: 'SUCC',
                        message: '로그인 성공',
                        data : user
                    };
                    userService.ChangeLastLogin(user.userNo,function(user){
                        console.log(user.lastlogin);
                    });
                   
                    console.log("user.userNo : " + user.userNo);
                    req.session.user = user;
                    req.session.save(function(){
                      console.log(user.email + " key : "+ req.session.id);
                      console.log("req.session.user.userNo : " + req.session.user.userNo);
                    })
                }
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(result));
            });
      }
      else {
        var result = {
            code: 'FAIL',
            message: '로그인 실패',
            data : null
        };
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
      }
});

exports.logout = function(req, res){
    req.session.destroy();
    res.clearCookie('sid');
};

//Join
router.get('/join/:email/:password/:nickname', function(req, res, next){
    var email = req.params.email;
    var password = req.params.password;
    var nickname = req.params.nickname;

    userService.Join(email, password, nickname, function(){
        console.log(email);
        console.log(nickname);
    });
});

module.exports = router;