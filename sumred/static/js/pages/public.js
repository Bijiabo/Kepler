/**
 * Created by huchunbo on 2017/4/9.
 */
define([
    '../components/navigation-bar',
    '../components/side-bar-menu',
    '../components/noNetWorkTip',
    '../components/content-class-filter',
    '../components/message-box'
], function (navigationBar, sideBarMenu, noNetworkTip, contentClassFilter, messageBox) {
    
    var init = function () {
        navigationBar.init();
        sideBarMenu.init();
        noNetworkTip.init();
        contentClassFilter.init();
        messageBox.init();
    };
    
    
    return {
        init: init
    };
});