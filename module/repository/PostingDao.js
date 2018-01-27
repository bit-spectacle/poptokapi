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
    PostingListGet: function (topLat, topLong, botLat, botLong, callback) {
        var sql = " \
        select postNo, userNo, viewsCnt, likeCnt, commentCnt, content, image, kakaoLink, postDate, tag, latitude, longitude \
        from post \
        WHERE latitude  between ? and ? \
            and longitude between ? and ? \
        ORDER BY postNo DESC \
        ";
        var parameter = [botLat, topLat, botLong, topLong];
        db.Select(sql, parameter, callback);
    },
    PostingMapGet: function (topLat, topLong, botLat, botLong, zoomLevel, userNo, callback) {
        var sql = "call P_PostMap(?, ?, ?, ?, ?, ?)";
        var parameter = [topLat, topLong, botLat, botLong, zoomLevel, userNo];
        db.Select(sql, parameter, callback)

    },
    PostingGet: function (postNo, callback) {
        var sql = " \
        select postNo, a.userNo, b.profileImage, b.nickname, viewsCnt, likeCnt, commentCnt, content, image, kakaoLink, postDate, tag, latitude, longitude, poststatus \
        from post a \
            inner join user b on a.userNo = b.userNo \
        where postNo= ? \
        ";
        var parameter = [postNo];
        db.Select(sql, parameter, callback);
    },
    PostingWrite: function(userNo, locationNo, content, image, kakaoLink, tag, latitude, longitude, posttype, opentype, callback) {
        var sql = "call P_PostAdd(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var parameter = [userNo, locationNo, content, image, kakaoLink, tag, latitude, longitude, posttype, opentype];
        db.Insert(sql, parameter, callback);
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
    },
    UpdateImage: function(postNo, imageUrl, callback) {
        var sql = "\
        update post \
        set image = ? \
        where postNo = ?";

        var parameter = [imageUrl, postNo];
        db.Update(sql, parameter, callback);
    }
}

module.exports = postingDao;