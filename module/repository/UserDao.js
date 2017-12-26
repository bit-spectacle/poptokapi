var db = require('./DB');

var userDao = {
    UserGet: function (email, callback) {
        var sql = "select userNo, email, nickname, Role, joindate, lastlogin from user where email=?";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    }
}

module.exports = userDao;