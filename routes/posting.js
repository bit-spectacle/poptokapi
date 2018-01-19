var express = require('express');
var router = express.Router();
var dateutils = require('date-utils');
var postingService = require('../module/service/PostingService');
var config = require('../config/config');


/* GET users listing. */
router.get('/list/:lastNo', function (req, res, next) {

    var lastNo = req.params.lastNo;
    if(!lastNo) {
        lastNo = 0;
    }

    postingService.PostingListGet(lastNo, function (posting) {
        for(var i=0; i<posting.length; i++) {
            if(posting[i].image == '') {
                posting[i].image = config.imageServerUrl + '/sky.jpg'; 
            }
            else {
                posting[i].image = config.imageServerUrl + posting[i].image; 
            }
            posting[i].postDate = new Date(posting[i].postDate).toFormat('YYYY-MM-DD HH24:MI:SS');
        }

        //console.log("user_uid: " + req.sesssion["user_uid"]);

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

    postingService.PostingMapGet(topLat, topLong, botLat, botLong, zoomLevel, userNo, function(posting) {
        for(var i=0; i<posting.length; i++) {
            if(posting[i].image != '') {
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
    if(!postNo || postNo < 1) {
        res.setHeader("Content-Type", "application/json");
        res.send("");
        return;
    }

    postingService.PostingGet(postNo, function (posting) {
        
        if(posting.image == '') {
            posting.image = config.imageServerUrl + '/sky.jpg'; 
        }
        else {
            posting.image = config.imageServerUrl + posting.image; 
        }

        posting.postDate = new Date(posting.postDate).toFormat('YYYY-MM-DD HH24:MI:SS');

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });
  
});

module.exports = router;