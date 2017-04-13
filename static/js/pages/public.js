/**
 * Created by huchunbo on 2017/4/9.
 */
define([
    '../components/navigation-bar',
    '../components/side-bar-menu',
    '../components/noNetWorkTip',
    '../components/content-class-filter',
], function (navigationBar, sideBarMenu, noNetworkTip, contentClassFilter) {
    
    var init = function () {
        navigationBar.init();
        sideBarMenu.init();
        noNetworkTip.init();
        contentClassFilter.init();
    };
    
    
    return {
        init: init
    };
});