/**
 * Created by huchunbo on 2017/4/9.
 */
define([
    '../api/API',
    '../components/navigation-bar',
    '../components/side-bar-menu',
    '../components/noNetWorkTip',
    '../components/content-class-filter',
    '../components/message-box',
    '../components/user'
], function (api, navigationBar, sideBarMenu, noNetworkTip, contentClassFilter, messageBox, user) {
    
    // 初始化 api
    var initAPI = function () {
        console.log('initAPI');
    };
    
    var init = function () {
        initAPI();
        
        navigationBar.init();
        sideBarMenu.init();
        noNetworkTip.init();
        contentClassFilter.init();
        messageBox.init();
        user.init();
    };
    
    
    return {
        init: init
    };
});