var express = require('express');
var router = express.Router();
var locationService = require('../module/service/LocationService');

router.get('/store/:topLat/:topLong/:botLat/:botLong', function(req, res, next) {
    var topLat = req.params.topLat;
    var topLong = req.params.topLong;
    var botLat = req.params.botLat;
    var botLong = req.params.botLong;

    locationService.StoreList(topLat, topLong, botLat, botLong, function(stores){
        
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(stores));
    });
  
});

module.exports = router;