var db = require('./DB');

var locationDao = {

    StoreList: function (topLat, topLong, botLat, botLong, callback) {
        var sql = " \
        SELECT locationNo, a.code,businessName,oldAddress,newAddress,latitude,longitude, name as category \
        FROM locationInfo a \
	        inner join category b on a.code = b.code \
        WHERE latitude  between ? and ? \
            and longitude between ? and ? ";
        var parameter = [botLat, topLat, botLong, topLong];
        db.Select(sql, parameter, callback)

    },
}

module.exports = locationDao;