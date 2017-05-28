/**
 * Created by huchunbo on 2017/5/28.
 * 分离所有前端调用接口
 */
define(
    [
        './request',
        './APIList'
    ],
    function (request, APIList) {

        var api = {};

        // 包装 API
        for (var key in APIList) {
            if (api[key] === undefined) {
                api[key] = {};
            }

            var apiModule = APIList[key];
            for (var functionAPIName in apiModule) {
                var functionAPIUrl = apiModule[functionAPIName];
                api[key][functionAPIName] = request(functionAPIUrl);
            }
        }

        window.API = api;
        return api;
});