var express = require('express');
var router = express.Router();
var postingService = require('../module/service/PostingService');
var config = require('../config/config');

/* GET users listing. */
router.get('/:lastNo', function (req, res, next) {

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
        }

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posting));
    });
  
});

module.exports = router;