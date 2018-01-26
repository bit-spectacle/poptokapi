var EasyFtp = require('easy-ftp');
var ftp = new EasyFtp();
var path = require('path');
var config = require('../../config/config');

FtpService = {
    Upload: function (localpath, remoteDir, fullpath) {
        localpath = path.resolve(localpath);

        ftp.connect(config.ftpConfig);
        ftp.mkdir(remoteDir, function(err){ console.log(err) });
        ftp.upload(localpath, fullpath, function(err){ console.log(err) });
    }
}

module.exports = FtpService;