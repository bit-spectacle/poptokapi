var reportDao = require('../repository/ReportDao');

reportService = {
    ReportLocation: function (userNo, locationLogList, callback) {
        console.log(userNo);
        console.log(locationLogList);
        reportDao.ReportLocation(userNo, locationLogList, function (err, rows) {
            if(err) { throw err;}
            callback();
        });
    }
}

module.exports = reportService;
