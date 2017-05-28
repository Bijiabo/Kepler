/**
 * Created by huchunbo on 2017/5/28.
 */
define([], function () {
    var request = function (url) {
        return function (data, callback) {
            console.debug('request', url);

            $.ajax({
                type : "POST",
                url : url,
                data : data,
                success : function(result) {
                    var json = $.parseJSON(result);
                    var error = json.error;
                    callback(result, error);
                },
                error : function(){
                    // alert("网络错误，请稍后再试！");
                    callback({}, "网络错误，请稍后再试！");
                }
            });
        }

    };

    return request;
});