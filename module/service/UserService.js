var userDao = require('../repository/UserDao');

UserService = {
    UserGet: function (email, callback) {
        userDao.UserGet(email, function (err, rows) {
            if(err) { throw err;}
            if(rows) {
                callback(rows[0]);
            }
        });
    },
    Login: function(email, callback){
        userDao.Login(email, function(err, rows){
            if(err) {throw err;}
            if(rows){ callback(rows[0])};
        });
    },
   
}

module.exports = UserService;
