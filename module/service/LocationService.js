var locationDao = require('../repository/LocationDao');

locationService = {
    StoreList: function (topLat, topLong, botLat, botLong, callback) {
        locationDao.StoreList(topLat, topLong, botLat, botLong, function (err, rows) {
            if (err) { throw err; }
            callback(rows);
        });
    },
}

module.exports = locationService;