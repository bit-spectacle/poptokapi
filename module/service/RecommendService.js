var recommendDao = require('../repository/RecommendDao');

recommendService = {
    GetRecommendLocation : function(userNo, callback){
        recommendDao.GetRecommendLocation(userNo, function(err, rows){
            if(err){
                throw err;   
            }
            callback(rows);
        });
    }
}



module.exports = recommendService;