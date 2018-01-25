var express = require('express');
var router = express.Router();
var dateutils = require('date-utils');
var reportService = require('../module/service/ReportService');
var config = require('../config/config');

router.post('/location/:userNo', function (req, res, next) {
    var userNo = req.params.userNo;
    var locationLogList = req.body;
    reportService.ReportLocation(userNo, locationLogList, function() {
        var result = {
            code: "SUCC",
            message: "성공",
            data: 0
        };
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

module.exports = router;