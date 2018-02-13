var db = require('./DB');

var RecommendDao = {
    GetRecommendLocation: function(userNo, callback){
        var sql = "\
        select b.businessName, b.latitude, b.longitude, a.userNo, a.locationNo, a.score from recommendLocation a \
        inner join\
	    locationInfo b on a.locationNo = b.locationNo\
        where userNo = ?"

        var parameter = [userNo];
        db.Select(sql, parameter , callback);
    }
}




module.exports = RecommendDao;