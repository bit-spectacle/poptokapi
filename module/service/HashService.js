var redis = require("redis");
var config = require('../../config/config');
var client = redis.createClient(config.redisConfig.port, config.redisConfig.host);
var tagkey = 'poptok_tag';

hashService = {
    HashList: function (count, callback) {
        var params = [tagkey, '+inf', '-inf', 'WITHSCORES', 'LIMIT', 0, count];
        client.zrevrangebyscore(params, function(err, response) {
           if(err) throw err;
           var result = [];
           for(var i=0; i < response.length / 2; i++) {
               result[i] = {
                   'tag' : response[i*2],
                   'count': response[i*2+1]
               }
           }
           callback(result);
        });
    },
}

module.exports = hashService;