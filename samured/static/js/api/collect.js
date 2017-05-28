/**
 * Created by huchunbo on 2017/5/28.
 */
define(['./request'], function (request) {
    var api = {};

    // 添加收藏
    // {video_id, author_id}
    api.add = "/api/collect/add_collect";

    // 取消收藏
    api.remove = "/api/collect/remove_collect";

    return {
        name: 'collect',
        api: api
    };
});