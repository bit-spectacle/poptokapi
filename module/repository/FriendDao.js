var db = require('./DB');

var friendDao = {
    GetFriendProfile : function(userNo, callback){
        var sql = "\
        select nickname, status, profileImage \
        from user where userNo in ( \
        select userNo from friend where userNo2 = ? and userStatus = 2)\
        or userNo in \
        (select userNo2 from friend where userNo = ? and userStatus = 2)";
        var parameter = [userNo,userNo];
        db.Select(sql, parameter, callback);
    },
    GetFriendReq : function(userNo, callback){
        var sql = "\
        select nickname, status, profileImage\
        from user where userNo2 = ? and userStatus = 1";
        var parameter = [userNo];
        db.Select(sql, parameter, callback);
    },
    RejectFriendStatus : function(userNo, userNo2, callback){
        var sql = "\
        Update friend set userStatus = 3 where userNo = ? and\
        userNo2 = ? ";
        var parameter = [userNo, userNo2];
        db.Update(sql, parameter, callback);
    },
    AcceptFriendStatus: function(userNo, userNo2, callback){
        var sql = "\
        Update friend set userStatus = 2 where userNo = ? and\
        userNo2 = ?";
        var parameter = [userNo, userNo2];
        db.Update(sql, parameter, callback);
    },
    RequestFriendStatus : function(userNo, userNo2, callback){
        var sql = "\
        Insert into friend \
        values(null, ?, ?, 1)";
        var parameter = [userNo, userNo2];
        db.Insert(sql, parameter , callback);
    },
    CheckFriend : function(userNo, userNo2, callback){
        var sql = "\
        Select userStatus from friend\
        where (userNo = ? and userNo2 = ?)\
        or (userNo = ? and userNo2 = ?)";
        var parameter = [userNo, userNo2, userNo2, userNo];
        db.Select(sql, parameter, callback);
    }
}
module.exports = friendDao;