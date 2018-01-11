var db = require('./DB');

var postingDao = {
    PostingListGet: function (lastNo, callback) {
        var sql = " \
        select rownum, postNo, userNo, viewsCnt, likeCnt, commentCnt, content, image, kakaoLink, postDate, tag, latitude, longitude \
        from (\
        select @rownum:=@rownum+1 as rownum, postNo, userNo, viewsCnt, likeCnt, commentCnt, content, image, kakaoLink, postDate, tag, latitude, longitude \
        from post a \
            inner join (select @rownum := 0) tmp on 1=1 \
            order by postDate desc) t \
        where rownum > ? \
        limit 100";
        var parameter = [lastNo];
        db.Select(sql, parameter, callback);
    },
    PostingMapGet: function (topLat, topLong, botLat, botLong, zoomLevel, userNo, callback) {
        var sql = "call P_PostMap(?, ?, ?, ?, ?, ?)";
        var parameter = [topLat, topLong, botLat, botLong, zoomLevel, userNo];
        db.Select(sql, parameter, callback)

    },
    CountLocationPosting: function(latitude, longitude, callback){
        var sql = "\
        select count(*) from posting where latitude=? and longitude=?";
        var parameter = [latitude, longitude];
        db.Select(sql, parameter, callback);
    },
    DeletePosting: function(postNo, callback){
        var sql = "\
        delete * from posting where postNo = ?";
        var parameter = [postNo];
        db.Delete(sql,parameter, callback);
    }

}

module.exports = postingDao;