var express = require('express');
var router = express.Router();
var multer = require('multer');
var mkdirp = require('mkdirp');
var config = require('../config/config');
var ftpService = require('../module/service/FtpService');
var uploadService = require('../module/service/UploadService');


var getExtensionOfFilename = function (filename) {
    var _fileLen = filename.length;
    var _lastDot = filename.lastIndexOf('.');
    var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
    return _fileExt;
}

var getDbFullPath = function(fullPath) {
    var len = fullPath.length;
    var lastIndex = fullPath.lastIndexOf('/image') + 6;
    var dbFullPath = fullPath.substring(lastIndex, len);
    return dbFullPath;
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.body != null) {
            var saveOption = req.params.destination;
            var subdir = '/' + req.params.pk;
            var dir = 'image/' + saveOption + subdir;
            mkdirp(dir, function (err) {
                if (err) console.error(err);
                else
                    cb(null, dir);
            });

        }
        else {
            var dir = 'image/etc/';
            mkdirp(dir, function (err) {
                if (err) console.error(err);
                else
                    cb(null, dir);
            });
        }
    },
    filename: function (req, file, cb) {        
        var extention = getExtensionOfFilename(file.originalname);
        var fname = req.params.pk + '_' + Date.now() + extention;
        console.log(fname);
        cb(null, fname);
    }
});

var upload = multer({ storage: storage }).single('upfile');

router.post('/:destination/:pk', function (req, res) {
    var destination = req.params.destination;
    var pk = req.params.pk;

    upload(req, res, function (err) {
        var result = {
            code: 'FAIL',
            message: '실패',
            data: err
        }
        if (!err) {
            var fullpath = '/' + res.req.file.destination + '/' + res.req.file.filename;
            var localpath = res.req.file.path;
            var remoatDir = '/' + res.req.file.destination;
            ftpService.Upload(localpath, remoatDir, fullpath);

            var dbFullPath = getDbFullPath(fullpath);
            uploadService.UpdateImage(destination, pk, dbFullPath, function(rows) {
                console.log(rows);
            });

            result = {
                code: 'SUCC',
                message: '성공',
                data: config.imageServerUrl + dbFullPath
            }
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(result));
    });
});

router.get('/', function (req, res, next) {
    res.render('uploadtest', { title: 'uploadtest' });
});

module.exports = router;

