/**
 * Created by huchunbo on 2017/5/28.
 */
define(['./request'], function (request) {
    var api = {};

    // 添加订阅
    api.add = "/api/subscribe/add_subscribe";

    // 取消订阅
    api.remove = "/api/subscribe/remove_subscribe";


    return {
        name: 'subscribe',
        api: api
    };
});