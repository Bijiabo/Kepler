/**
 * Created by huchunbo on 2017/4/9.
 */
define([
    '../components/navigation-bar',
    '../components/noNetWorkTip'
], function (navigationBar, noNetworkTip) {
    
    var init = function () {
        navigationBar.init();
        noNetworkTip.init();
    };
    
    
    return {
        init: init
    };
});