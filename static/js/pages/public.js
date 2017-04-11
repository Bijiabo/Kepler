/**
 * Created by huchunbo on 2017/4/9.
 */
define([
    '../components/navigation-bar',
    '../components/side-bar-menu',
    '../components/noNetWorkTip'
], function (navigationBar, sideBarMenu, noNetworkTip) {
    
    var init = function () {
        navigationBar.init();
        sideBarMenu.init();
        noNetworkTip.init();
    };
    
    
    return {
        init: init
    };
});