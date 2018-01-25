var express = require('express');
var router = express.Router();
var dateutils = require('date-utils');
var postingService = require('../module/service/PostingService');
var config = require('../config/config');


/* GET users listing. */
router.get('/list/:lastNo', function (req, res, next) {

    var lastNo = req.params.lastNo;
    if (!lastNo) {
        lastNo = 0;
    }


    // if(req.session.user != null){
    //     //console.log("userNo : " + user.userNo);
    //     console.log("**********posting : user.userNo - " + req.session.user.userNo);
    //     postingService.PostingListGet(lastNo, function (posting) {
    //         for(var i=0; i<posting.length; i++) {
    //             if(posting[i].image == '') {
    //                 posting[i].image = config.imageServerUrl + '/sky.jpg'; 
    //             }
    //             else {
    //                 posting[i].image = config.imageServerUrl + posting[i].image; 
    //             }
    //             posting[i].postDate = new Date(posting[i].postDate).toFormat('YYYY-MM-DD HH24:MI:SS');
    //         }

    //         res.setHeader("Content-Type", "application/json");
    //         res.send(JSON.stringify(posting));
    //     });
    // }
    // else{
    //     res.send('You have to Login First');
    // }

    postingService.PostingListGet(lastNo, function (posting) {
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

    postingService.PostingWrite(writeParam, function(postNo) {
        var result = {
            code: 'FAIL',
            message: '실패',
            data: 0
        };
        if(postNo != null && postNo.length > 0) postNo = postNo[0].postNo;
        if(postNo > 0) {
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