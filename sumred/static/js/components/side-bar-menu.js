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
        $(document).on('click', '.submenu .item .title', function (event) {
            event.preventDefault();
            var $this = $(this).parent('.item');
            $('.submenu .item .title').hide();
            $this.children('.back').show();
            console.log($this);
            $this.find('.subclass').show();
        });
        $(document).on('click', '.submenu .item .back', function (event) {
            event.preventDefault();
            $('.submenu .item .title').show();
            $(this).hide();
            var $this = $(this).parent('.item');
            $this.find('.subclass').hide();
        });
        
        // 测试添加频道
        $(document).on('click', '.test-book-channel', function () {
            var itemHTML = '\
                <a href="#">\
                <div class="item adding" title="测试频道">\
                    <div class="logo">\
                        <img src="../static/image/avatars/3.jpg" alt="">\
                    </div>\
                    <div class="title">测试频道</div>\
                    <div class="info">1024+</div>\
                </div>\
                </a>\
            ';
            var newItem = $(itemHTML);
            $('.side-bar-menu .channel-list').prepend(newItem);
            setTimeout(function () {
                newItem.find('.item').removeClass('adding');
            }, 1900);
        });
    
        // 测试取消订阅频道
        $(document).on('click', '.test-cancel-book-channel', function () {
            var channelListElment = $('.side-bar-menu .channel-list');
            if (channelListElment.find('.item').length == 0) { return; }
            // 随机选择一个要删除的目标
            var targetItem = $(
                channelListElment.find('a').get(
                    Math.floor(
                        Math.random() * channelListElment.find('.item').length
                    )
                )
            );
            console.log(targetItem);
            targetItem.find('.item').addClass('removing');
            
            setTimeout(function () {
                targetItem.remove();
            }, 1500);
        });
    };
    
    return {
        init: init
    };
});