var postingDao = require('../repository/PostingDao');

postingService = {
    PostingListPaging: function (lastNo, callback) {
        postingDao.PostingListPaging(lastNo, function (err, rows) {
            if (err) { throw err; }
            if (rows) {
                callback(rows);
            }
        });
    },
    PostingListGet: function (topLat, topLong, botLat, botLong, callback) {
        postingDao.PostingListGet(topLat, topLong, botLat, botLong, function (err, rows) {
            if (err) { throw err; }
            if (rows) {
                callback(rows);
            }
        });
    },
    PostingMapGet: function (topLat, topLong, botLat, botLong, zoomLevel, userNo, callback) {
        postingDao.PostingMapGet(topLat, topLong, botLat, botLong, zoomLevel, userNo, function (err, rows) {
            if (err) { throw err; }
            if (rows) {
                if (rows.length > 0) {
                    callback(rows[0]);
                }
            }
        });
    },
    PostingGet: function (postNo, callback) {
        postingDao.PostingGet(postNo, function (err, rows) {
            if (err) { throw err; }
            if (rows) {
                if (rows.length > 0) {
                    callback(rows[0]);
                }
            }
        });
    },
    PostingWrite: function (writeParam, callback) {

        postingDao.PostingWrite(writeParam.userNo, writeParam.locationNo, writeParam.content, writeParam.image, 
            writeParam.kakaoLink, writeParam.tag, writeParam.latitude, writeParam.longitude, writeParam.posttype, writeParam.opentype,
            function (err, rows) {

            if (err) { throw err; }
            if (rows) {
                if (rows.length > 0) {
                    callback(rows[0]);
                }
            }
        });
    }

}

module.exports = postingService;
