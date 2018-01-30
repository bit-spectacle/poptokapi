var express = require('express');
var router = express.Router();

var hashService = require('../module/service/HashService');

router.get('/list/:count', function (req, res) {
    var count = req.params.count;
    hashService.HashList(count, function(rows) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;