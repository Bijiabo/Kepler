/**
 * Created by huchunbo on 2017/4/9.
 */
define([], function () {
    
    var init = function () {
        console.debug('init navigationBar;');
        bindEvents();
    };
    
    var bindEvents = function () {
        $(document).on('click', '.slidebar-menu-button', function () {
            var bodyElement = $('body');
            var targetClass = 'has-side-bar-menu';
            if (bodyElement.hasClass(targetClass)) {
                bodyElement.removeClass(targetClass);
            } else {
                bodyElement.addClass(targetClass);
            }
        });
    };
    
    return {
        init: init
    };
});