/**
 * Created by huchunbo on 2017/4/9.
 */
define([], function () {
    
    var init = function () {
        console.debug('init noNetWorkTip;');
        bindEvents();
    };
    
    var bindEvents = function () {
        $(document).on('click', '.no-network-tip .close-button', function () {
            $(this).parent('.no-network-tip').hide();
        });
    };
    
    return {
        init: init
    };
});