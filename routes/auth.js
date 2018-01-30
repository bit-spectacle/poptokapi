var express = require('express');
var router = express.Router();

var userService = require('../module/service/UserService');

/* GET home page. */
router.get('/login/:email?/:password?', function (req, res, next) {
    var email = req.params.email;
    var password = req.params.password;

    if (email) {
        userService.Login(email,
            function (user) {
                console.log(user);
                var result = {
                    code: 'FAIL',
                    message: '로그인 실패',
                    data: null
                };
                if (user != null && password == user.password) {
                    delete user.password;
                    result = {
                        code: 'SUCC',
                        message: '로그인 성공',
                        data: user
                    };
                    userService.ChangeLastLogin(user.userNo, function (user) {
                        console.log(user.lastlogin);
                    });

                    console.log("user.userNo : " + user.userNo);
                    req.session.user = user;
                    req.session.save(function () {
                        console.log(user.email + " key : " + req.session.id);
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
            data: null
        };
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    }
});

exports.logout = function (req, res) {
    req.session.destroy();
    res.clearCookie('sid');
};

//Join
router.get('/join/:email/:password/:nickname', function (req, res, next) {
    var email = req.params.email;
    var password = req.params.password;
    var nickname = req.params.nickname;
   //res.params.result;

    var result = {
        code: 'FAIL',
        message: '가입 실패',
        data: 3
    };

    userService.Join(email, password, nickname, function (rows) {
        console.log("*************************")
        console.log(email);
        console.log(nickname);
        if(rows[0].result == 0){
            result = {
                code: 'SUCC',
                message: '가입 성공',
                data: rows[0].result
            };
        }
        result.data = rows[0].result;
        console.log(rows[0].result);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/changeNickName/:nickname/:userNo',function(req, res,next){
    var nickname = req.params.nickname;
    var userNo = req.params.userNo;
    var result = {
        code: 'FAIL',
        message: '실패',
        data: null
    }

    console.log(nickname);
    console.log(userNo);
    userService.ChangeNickName(nickname, userNo, function(){
        result = {
            code:'SUCC',
            message : '성공',
            data : null
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/checkNickName/:nickname', function (req, res, next) {
    var nickname = req.params.nickname;
    var result = {
        code: 'FAIL',
        message: '실패',
        data: 1
    };
    userService.CheckNickName(nickname, function (userNo) {
        console.log(nickname);
        if (userNo > 0) {

        }
        else{
            result = {
                code : 'SUCC',
                message: '성공',
                data : null
            };
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    })
});

router.get('/checkEmail/:email', function (req, res, next) {
    var email = req.params.email;
    var result = {
        code: 'FAIL',
        message: '실패',
        data: null
    }
    userService.CheckEmail(email, function (userNo) {
        console.log(email);
        console.log(userNo);
        if (userNo > 0) {

        }
        else{
            result = {
                code : 'SUCC',
                message: '성공',
                data : null
            };
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    })
});


router.get('/changeStatus/:status/:userNo',function(req, res,next){
    var status = req.params.status;
    var userNo = req.params.userNo;
    var result = {
        code: 'FAIL',
        message: '실패',
        data: null
    }

    console.log("status");
    console.log(status);
    console.log(userNo);

    userService.ChangeStatus(status, userNo, function(){
        result = {
            code:'SUCC',
            message : '성공',
            data : null
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));

    });
});

router.get('/updateImage/:userNo/:imageUrl',function(req, res,next){

    var userNo = req.params.userNo;
    var imageUrl = req.params.imageUrl;
    var result = {
        code: 'FAIL',
        message: '실패',
        data: null
    }

    console.log("imageUrl");
    console.log(imageUrl);
    console.log(userNo);

    userService.UpdateImage(userNo, imageUrl, function(){
        result = {
            code:'SUCC',
            message : '성공',
            data : null
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));

    });
});


module.exports = router;