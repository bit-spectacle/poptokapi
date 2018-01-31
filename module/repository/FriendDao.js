var db = require('./DB');

var friendDao = {
    GetFriendProfile : function(userNo, callback){
        var sql = "\
        select u.userNo, nickname, status, profileImage, userStatus\
        from User u\
        inner join(\
        select userNo, userStatus from friend where userNo2 = ?\
        union \
	    select userNo2 as userNo, userStatus from friend where userNo = ?) t\
        on u.userNo = t.UserNo where userStatus = 2";
        var parameter = [userNo,userNo];
        db.Select(sql, parameter, callback);
    },
    AddMeFriend : function(userNo, callback){
        var sql = "\
        select u.userNo, nickname, status, profileImage, userStatus\
        from User u\
        inner join(\
        select userNo, userStatus from friend where userNo2 = ?\
        union \
	    select userNo2 as userNo, userStatus from friend where userNo = ?) t\
        on u.userNo = t.UserNo where userStatus = 1";
        var parameter = [userNo];
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
        Update friend set userStatus = 3 where (userNo = ? and\
        userNo2 = ?) or (userNo = ? and userNo2=?) ";
        var parameter = [userNo, userNo2, userNo2, userNo];
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