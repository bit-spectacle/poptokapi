var db = require('./DB');

var userDao = {
    UserGet: function (email, callback) {
        var sql = "select userNo,email, nickname, status, profileImage, role, \
        joindate, lastlogin from user \
        where email=?";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    },
    Login: function (email, callback) {
        var sql = "select userNo, email, password, nickname, status, profileImage, role, \
        joindate, lastlogin from user \
        where email = ? ";
        var parameter = [email];
        db.Select(sql, parameter, callback);
    },
    GetProfile(email, callback){
        var sql = "\
        select profileImage, nickname, status \
        where email = ? ";
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
        select userNo from user where email = ?";
        var parameter = [email];
        db.Select(sql, parameter, callback);    
    },
    CheckNickName: function (nickname, callback) {
        var sql = "\
        select userNo from user where nickname = ?";
        var parameter = [nickname];
        db.Select(sql, parameter, callback);
    },
    ChangeNickName: function (nickname, userNo, callback) {
        var sql = "\
        update user set nickname = ? where userNo=? ";
        var parameter = [nickname, userNo];
        db.Update(sql, parameter, callback);
    },
    Join : function(email, password, nickname,  callback){
        var sql = " \
        CALL P_UserJoin(?,?,?)";
        var parameter = [email, password, nickname];
        db.Insert(sql, parameter, callback);
    },

    ChangeStatus: function(status, userNo, callback) {
        var sql = "\
        update user set status = ? where userNo=? ";
        var parameter = [status, userNo];
        db.Update(sql, parameter, callback);
    }
}

module.exports = userDao;