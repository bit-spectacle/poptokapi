var friendDao = require('../repository/FriendDao');

FriendService = {
    GetFriendProfile: function(userNo, callback){
        friendDao.GetFriendProfile(userNo, function(err, rows){
            if(err) {
                throw err;
            }
            callback(rows);
        });
    },
    GetFriendReq : function(userNo, callback){
        friendDao.GetFriendReq(userNo, function(err, rows){
            if(err){
                throw err;
            }
            callback(rows);
        });
    },
    RejectFriendStatus : function(userNo, userNo2, callback){
        friendDao.RejectFriendStatus(userNo, userNo2, function(err, rows){
            if(err){
                throw err;
            }
            callback();
        });
    },
    AcceptFriendStatus : function(userNo, userNo2, callback){
        friendDao.AcceptFriendStatus(userNo, userNo2, function(err, rows){
            if(err){
                throw err;
            }
            callback(rows);
        });
    },
    RequestFriendStatus : function(userNo, userNo2, callback){
        friendDao.RequestFriendStatus(userNo, userNo2, function(err, rows){
            if(err){
                throw err;
            }
            callback(rows);
        });
    },
    CheckFriend : function(userNo, userNo2, callback){
        friendDao.CheckFriend(userNo, userNo2, function(err, rows){
            if(err){
                throw err;
            }
            callback(rows);
        });
    }
}

module.exports = FriendService;