/**
 * Created by huchunbo on 2017/4/9.
 */
define([], function () {
    
    var init = function () {
        console.debug('init navigationBar;');
        bindEvents();
    };
    
    var bindEvents = function () {
        // 隐藏、显示侧边栏
        $(document).on('click', '.slidebar-menu-button', function () {
            var bodyElement = $('body');
            var targetClass = 'has-side-bar-menu';
            if (bodyElement.hasClass(targetClass)) {
                bodyElement.removeClass(targetClass);
            } else {
                bodyElement.addClass(targetClass);
            }
        });
        // 隐藏、显示消息盒子
        $(document).on('click', '.navigation-bar .message-box-button', function () {
            var messageBoxElement = $('.message-box');
            if (messageBoxElement.data('show')) {
                messageBoxElement.data('show',false).hide();
            } else {
                messageBoxElement.data('show',true).show();
            }
        });
        // 搜索框获得焦点
        $(document).on('focus', '.navigation-bar .search-input-container input', function () {
            $('.navigation-bar .search-input-container .input-group').addClass('focus');
        });
        // 搜索框失去焦点
        $(document).on('blur', '.navigation-bar .search-input-container input', function () {
            $('.navigation-bar .search-input-container .input-group').removeClass('focus');
        });
    };
    
    return {
        init: init
    };
});