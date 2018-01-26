var postingDao = require('../repository/PostingDao');
var userDao = require('../repository/UserDao');

UploadService = {
    UpdateImage: function (destination, pk, imageUrl, callback) {
        if(destination == 'post') {
            postingDao.UpdateImage(pk, imageUrl, function (err, rows) {
                if (err) { throw err; }
                callback(rows);
            });
        }

        if(destination == 'user') {
            userDao.UpdateImage(pk, imageUrl, function (err, rows) {
                if (err) { throw err; }
                callback(rows);
            });
        }
        
    }
}

module.exports = UploadService;