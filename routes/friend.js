
'use strict';

var express = require('express');
var router = express.Router();

var friendService = require('../module/service/FriendService');

var session = require('express-session');
var bodyParser = require('body-parser');

var MySQLStore = require('express-mysql-session')(session);
var app = express();

router.get('/findFriend/:userNo', function (req, res, next) {

    var userNo = req.params.userNo;
    var result = {
        code: 'FAIL',
        message: '친구 없음',
        data: 0
    };
    friendService.GetFriendProfile(userNo, function (rows) {

        if (rows) {
            result = {
                code: 'SUCC',
                message: '친구 있음',
                data: rows
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/RejectFriendStatus/:userNo/:userNo2', function (req, res, next) {
    var userNo = req.params.userNo;
    var userNo2 = req.params.userNo2;

    var result = {
        code: 'FAIL',
        message: '실패',
        data: 0
    };

    friendService.RejectFriendStatus(userNo, userNo2, function () {

        result = {
            code: 'SUCC',
            message: '성공',
            data: 1
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/RequestFriendStatus/:userNo/:userNo2', function (req, res, next) {
    var userNo = req.params.userNo;
    var userNo2 = req.params.userNo2;

    var result = {
        code: 'FAIL',
        message: '실패',
        data: 0
    };

    friendService.RequestFriendStatus(userNo, userNo2, function () {
        result = {
            code: 'SUCC',
            message: '성공',
            data: 1
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/AcceptFriendStatus/:userNo/:userNo2', function (req, res, next) {
    var userNo = req.params.userNo;
    var userNo2 = req.params.userNo2;

    var result = {
        code: 'FAIL',
        message: '실패',
        data: 0
    };

    friendService.AcceptFriendStatus(userNo, userNo2, function () {

        result = {
            code: 'SUCC',
            message: '성공',
            data: 1
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/CheckFriend/:userNo/:userNo2', function (req, res, next) {
    var userNo = req.params.userNo;
    var userNo2 = req.params.userNo2;

    var result = {
        code: 'SUCC',
        message: '성공',
        data: 0
    };

    friendService.CheckFriend(userNo, userNo2, function () {

        result = {
            code: 'FAIL',
            message: '실패',
            data: 1
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});




module.exports = router;