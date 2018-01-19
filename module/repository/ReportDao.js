var db = require('./DB');

var reportDao = {
    ReportLocation: function(userNo, locationLogList, callback){
        var sql = "insert into locationlog (userNo, latitude, longitude, altitude, accuracy, provider, regdate) values ?";
        var parameter = [];
        for(var i=0; i<locationLogList.length; i++) {
            var latitude = locationLogList[i].latitude;
            var longitude = locationLogList[i].longitude;
            var altitude = locationLogList[i].altitude;
            var accuracy = locationLogList[i].accuracy;
            var provider = locationLogList[i].provider;
            var regdate = locationLogList[i].regdate;
            parameter[i] = [parseInt(userNo), latitude, longitude, altitude, accuracy, provider, regdate];
        }
        db.Insert(sql, [parameter], callback);
    }
}

module.exports = reportDao;