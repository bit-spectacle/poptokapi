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
                    sessionId : req.sessionID,
                    data : null,
                };
                if(password == user.password)
                {
                    req.session.user_uid = user.userNo;
                    result = {
                        code: 'SUCC',
                        message: '로그인 성공',
                        sessionId : req.sessionID,
                        data : user
                    };
                    userService.ChangeLastLogin(user.userNo,function(user){
                        console.log(user.lastlogin);
                    });
                   
                    // store.set(user.user_uid, req.session, callback);
                    console.log("user.user_uid : " + user.user_uid);
                    req.session.user = user;
                    req.session.save(function(){
                       // res.send(JSON.stringify(status , 'SUCC'));
                      console.log(user.email + " key : "+ req.session.id);
                      console.log("req.session.user.userNo : " + req.session.user.userNo);
                      console.log("req.sessionId : " + req.sessionID);
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
            user_uid : null
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