var path = require('path');
var log4js = require('log4js');
var mkdirp = require('mkdirp');
var format = require('string-format');
var config = require('../../config/config');

// 로그 경로 생성
mkdirp(config.logDir, function (err) {
    if (err) console.error(err);
    else console.log('dir created');
});

// 로그 파일명
var log_filename = path.join(config.logDir, 'poptok_api.log');

// 로그 파일 설정
log4js.configure({
    appenders: {
        everything: { type: 'dateFile', filename: log_filename }
    },
    categories: {
        default: { appenders: ['everything'], level: 'debug' }
    }
});
var logger = log4js.getLogger();

LogService  = {
    DebugFormat: function(msgformat, args) {
        var logmessage = format(msgformat, args);
        logger.debug(logmessage);
    }
}

module.exports = LogService;