var db = require('./DB');

var userDao = {
    UserGet: function (email, callback) {
        var sql = "select userNo, nickname, Role, \
        joindate, lastlogin from user \
        where email=?";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    },
    Login: function(email, password, callback){
        var sql = "\
        select * from user where email = ? \
        and password = ?";
        var parameter = [email, password];
        db.Select(sql, parameter,callback);
    }
    
}

module.exports = userDao;