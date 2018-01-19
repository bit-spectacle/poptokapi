var db = require('./DB');

var userDao = {
    UserGet: function (email, callback) {
        var sql = "select userNo, nickname, Role, \
        joindate, lastlogin from user \
        where email=?";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    },
    Login: function (email, callback) {
        var sql = "\
        select * from user where email = ? ";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    },
    ChangeLastLogin: function (userNo, callback) {
        var sql = "\
        update user set lastlogin = now() \
        where userNo = ?";
        var parameter = [userNo];
        db.Update(sql, parameter, callback);
    },
    CheckEmail:function(email, callback){
        var sql = "\
        select * from user where email = ?";
        var parameter = [email];
        db.Select(sql, parameter, callback);    
    },
    CheckNickName: function (nickname, callback) {
        var sql = "\
        select * from user where nickname = ?";
        var parameter = [nickname];
        db.Select(sql, parameter, callback);
    },
    ChangeNickName: function (nickname, userno, callback) {
        var sql = "\
        update user set nickname = ? where useNo=? ";
        var parameter = [nickname, userno];
        db.Update(sql, parameter, callback);
    },
    Join : function(email, password, nickname,  callback){
        var sql = " \
        insert into user \
        values (null, ?,?,?,'',now(),now())";
        var parameter = [email, password, nickname, callback];
        db.Insert(sql, parameter, callback);
    }
}

module.exports = userDao;