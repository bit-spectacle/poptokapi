var userDao = require('../repository/UserDao');

UserService = {
    UserGet: function (email, callback) {
        userDao.UserGet(email, function (err, rows) {
            if (err) { throw err; }
            if (rows) {
                callback(rows[0]);
            }
        });
    },
    Login: function (email, callback) {
        userDao.Login(email, function (err, rows) {
            if (err) { throw err; }
            callback(rows[0]);
        });
    },
    GetProfile: function(email, callback){
        userDao.getProfile(email, function(err, rows){
            if(err) { throw err;}
            if(rows) { callback(rows[0]); }
        })
    },
 //   Logout은 sql문 처리해주지 않고 session처리만 하기 때문에 UserService에만 존재.
 //   그래서 얘는 session씀 userDao 안씀
    Logout: function(email, callback){
        exports.Logout(email, function(err, rows){
            if(err) {throw err;}
            if(rows) { callback(rows[0]);}
        })
    },
    ChangeLastLogin: function (userNo, callback) {
        userDao.ChangeLastLogin(userNo, function (err, rows) {
            if (err) { throw err; }
            if (rows) { callback(rows[0]); }
        });
    },
    CheckEmail: function(email, callback){
        userDao.CheckEmail(email, function(err, rows){
            if(err) {throw err;}
            var userNo;
            
            if(rows) 
            {
                if(rows[0].userNo > 0)
                    userNo = rows[0].userNo;
                else
                    userNo = 0;
            }
            console.log("UserService.checkEmail : " + userNo);    
            callback(userNo);
        });
    },
    CheckNickName: function (nickname, callback) {
        userDao.CheckNickName(nickname, function (err, rows) 
        {
            var userNo;
            if (err) { throw err; }
            if(rows) 
            {
                if(rows[0].userNo > 0)
                    userNo = rows[0].userNo;
                else
                    userNo = 0;
            }
            callback(userNo);
        });
    },
    ChangeNickName: function (nickname, userNo, callback) {
        userDao.ChangeNickName(nickname, userNo, function (err, rows) {
            if (err) { throw err; }
           callback();
        });
    },
    
    Join : function(email, password, nickname,  callback){
        userDao.Join(email, password, nickname,  function(err, rows){
            if(err) {throw err;}
            if(rows != null && rows.length > 0)
                callback(rows[0]);
        });
    },
    ChangeStatus: function (status, userNo, callback) {
        userDao.ChangeStatus(status, userNo, function (err, rows) {
            if (err) { throw err; }
           callback();
        });
    }


}


module.exports = UserService;
