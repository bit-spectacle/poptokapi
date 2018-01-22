var postingDao = require('../repository/PostingDao');

postingService = {
    PostingListGet: function (lastNo, callback) {
        postingDao.PostingListGet(lastNo, function (err, rows) {
            if(err) { throw err;}
            if(rows) {
                callback(rows);
            }
        });
    },
    PostingMapGet: function (topLat, topLong, botLat, botLong, zoomLevel, userNo, callback) {
        postingDao.PostingMapGet(topLat, topLong, botLat, botLong, zoomLevel, userNo, function (err, rows) {
            if(err) { throw err;}
            if(rows) {
                if(rows.length > 0) {
                    callback(rows[0]);
                }
            }
        });
    },
<<<<<<< HEAD
    PostingGet: function (postNo, callback) {
        postingDao.PostingGet(postNo, function (err, rows) {
            if(err) { throw err;}
            if(rows) {
                if(rows.length > 0) {
                    callback(rows[0]);
                }
            }
        });
    }
=======
   
>>>>>>> 15368e5c114aac012b03f91a1a1e210ae1eec724
}

module.exports = postingService;
