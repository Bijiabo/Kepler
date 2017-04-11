/**
 * Created by huchunbo on 2017/4/9.
 */
define([], function () {
    
    var init = function () {
        console.debug('init sideBarMenu;');
        bindEvents();
    };
    
    var bindEvents = function () {
        // 隐藏、显示二级菜单
        $(document).on('mouseenter', '.side-bar-menu > .item', function () {
            var $this = $(this);
            $this.find('.submenu').show();
        });
        $(document).on('mouseleave', '.side-bar-menu > .item', function () {
            var $this = $(this);
            $this.find('.submenu').hide();
        });
        $(document).on('click', '.submenu .item', function () {
            var $this = $(this);
            if (!$this.data('display-subclass')) {
                $this.find('.subclass').show();
                $this.data('display-subclass', true);
            } else {
                $this.find('.subclass').hide();
                $this.data('display-subclass', false);
            }
        });
        
    };
    
    return {
        init: init
    };
});