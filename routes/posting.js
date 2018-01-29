var express = require('express');
var router = express.Router();
var dateutils = require('date-utils');
var config = require('../config/config');
var postingService = require('../module/service/PostingService');
var Log = require('../module/service/LogService');

router.get('/list/:lastNo', function (req, res, next) {

    var lastNo = req.params.lastNo;
    if (!lastNo) {
        lastNo = 0;
    }

    postingService.PostingListPaging(lastNo, function (posting) {
        for (var i = 0; i < posting.length; i++) {
            if (posting[i].image == '') {
                posting[i].image = config.imageServerUrl + '/poptok_logo_back.png';
            }
            else {
                posting[i].image = config.imageServerUrl + posting[i].image;
            }
            posting[i].postDate = new Date(posting[i].postDate).toFormat('YYYY-MM-DD HH24:MI:SS');
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });
});

router.get('/list/:topLat/:topLong/:botLat/:botLong', function (req, res, next) {

    var topLat = req.params.topLat;
    var topLong = req.params.topLong;
    var botLat = req.params.botLat;
    var botLong = req.params.botLong;

    postingService.PostingListGet(topLat, topLong, botLat, botLong, function (posting) {
        for (var i = 0; i < posting.length; i++) {
            if (posting[i].image == '') {
                posting[i].image = config.imageServerUrl + '/poptok_logo_back.png';
            }
            else {
                posting[i].image = config.imageServerUrl + posting[i].image;
            }
            posting[i].postDate = new Date(posting[i].postDate).toFormat('YYYY-MM-DD HH24:MI:SS');
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });

});

router.get('/map/:topLat/:topLong/:botLat/:botLong/:zoomLevel/:userNo', function (req, res, next) {
    var topLat = req.params.topLat;
    var topLong = req.params.topLong;
    var botLat = req.params.botLat;
    var botLong = req.params.botLong;
    var zoomLevel = req.params.zoomLevel;
    var userNo = req.params.userNo;
    console.log("map");
    console.log(topLat);
    console.log(topLong);
    console.log(botLat);
    console.log(botLong);
    console.log(zoomLevel);
    console.log(userNo);

    postingService.PostingMapGet(topLat, topLong, botLat, botLong, zoomLevel, userNo, function (posting) {
        for (var i = 0; i < posting.length; i++) {
            if (posting[i].image != '') {
                posting[i].image = config.imageServerUrl + posting[i].image;
            }
            posting[i].postDate = new Date(posting[i].postDate).toFormat('YYYY-MM-DD HH24:MI:SS');
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });

});

router.get('/get/:postNo?', function (req, res, next) {

    var postNo = req.params.postNo;
    if (!postNo || postNo < 1) {
        res.setHeader("Content-Type", "application/json");
        res.send("");
        return;
    }

    postingService.PostingGet(postNo, function (posting) {

        if (posting.image == '') {
            posting.image = config.imageServerUrl + '/poptok_logo_back.png';
        }
        else {
            posting.image = config.imageServerUrl + posting.image;
        }

        posting.postDate = new Date(posting.postDate).toFormat('YYYY-MM-DD HH24:MI:SS');

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });

});

router.post('/write/', function (req, res, next) {
    var writeParam = req.body;

    postingService.PostingWrite(writeParam, function (postNo) {
        var result = {
            code: 'FAIL',
            message: '실패',
            data: 0
        };
        if (postNo != null && postNo.length > 0) postNo = postNo[0].postNo;
        if (postNo > 0) {
            // 해시 태그가 있는 경우 로그에 남겨서 flum이 가져갈수 있도록 한다.
            if(writeParam.tag != null && writeParam.tag.length > 0) {
                Log.DebugFormat('{0}', writeParam.tag);
            }
            result = {
                code: 'SUCC',
                message: '성공',
                data: postNo
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });

});

module.exports = router;