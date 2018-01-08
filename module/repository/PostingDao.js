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
    }
}

module.exports = postingDao;