
'use strict';

var express = require('express');
var router = express.Router();

var friendService = require('../module/service/RecommendService');

var session = require('express-session');
var bodyParser = require('body-parser');

var MySQLStore = require('express-mysql-session')(session);
var app = express();

router.get('/RecommendLocation/:userNo',function(req, res, next){
    var userNo = req.params.userNo;
    var result = {
        code : 'FAIL',
        message : '추천 장소 없음',
        data : []
    };
    recommendService.GetRecommendLocation(userNo, function(rows){
        console.log(rows);
        if(rows){
            result = {
                code : 'SUCC',
                message : '추천 장소 있음',
                data : rows
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});




module.exports = router;
