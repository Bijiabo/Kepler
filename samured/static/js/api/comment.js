/**
 * Created by huchunbo on 2017/5/28.
 */
define(['./request'], function (request) {
    var api = {};

    // 添加评论
    /*
     // post data
     {
     "parentId": "0",
     "rec_id": $("#aid").val(),
     "video_id": $("#vid").val(),
     "content": $("#comment-input-textarea").val()
     }
     */
    api.add = "/api/detail/add_comment";

    return {
        name: 'comment',
        api: api
    };
});