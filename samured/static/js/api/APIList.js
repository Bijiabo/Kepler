/**
 * Created by huchunbo on 2017/5/28.
 * 分离所有前端调用接口
 */
define(
    [
        './collect',
        './comment',
        './like',
        './subscribe'
    ],
    function () {
        console.log('run API list.');

        var list = {};

        for (var i=0,len=arguments.length; i<len; i++) {
            var item = arguments[i];
            console.log(item);
            list[item.name] = item.api;
        }

        window.APIList = list;
        window.StringifyAPIList = JSON.stringify(APIList, null, '\t');
        return list;

    }
    );