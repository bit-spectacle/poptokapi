var postingDao = require('../repository/PostingDao');

postingService = {
    PostingListGet: function (lastNo, callback) {
        postingDao.PostingListGet(lastNo, function (err, rows) {
            if(err) { throw err;}
            if(rows) {
                callback(rows);
            }
        });
    }
}

module.exports = postingService;
