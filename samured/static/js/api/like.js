/**
 * Created by huchunbo on 2017/5/28.
 */
define(['./request'], function (request) {
    var api = {};

    // 点赞功能
    // {video_id, author_id, type}
    api.toggle = "/api/like/change_like";

    return {
        name: 'like',
        api: api
    };
});