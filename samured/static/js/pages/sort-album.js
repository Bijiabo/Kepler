/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            videoCards: Array.apply(null, Array(50))
        },
        methods: {
        },
        mounted: function () {
        }
    });
};
window.didLoadActions.push(render);

requirejs(['public'], function(_public) {
    
    var targetActions = function () {
        _public.init();
    };
    
    window.didLoadActions.push(targetActions);
    
    var bindEvents = function () {
        // 绑定有侧边栏点击展开、收缩按钮动作
        var rightSideBarDropDownButtonSelector = '.sort-container .right .item.dropdown';
        $(document).on('click', rightSideBarDropDownButtonSelector, function () {
            var $this = $(this);
            var targetToggleDisplayItems = $this.siblings('.hide-item');
            if ($this.data('dropdown') == true) { // 已经展开
                targetToggleDisplayItems.hide();
                $this.find('span.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
                $this.data('dropdown', false);
            } else { // 未展开
                targetToggleDisplayItems.show();
                $this.find('span.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
                $this.data('dropdown', true);
            }
        });
        
        // 用户点击查看所有视频列表
        $(document).on('click', '.watch-all-video', function () {
            var $this = $(this);
            var container = $this.parents('.list-video-card-item-package');
            if (container.find('.album-video-list').length > 0) {
                container.find('.album-video-list').remove();
                return;
            }
            
            // todo: 获取视频播放列表数据
            var playlistLength = 5;
                
            var listHTML = '';
            for (var i=0; i<playlistLength; i++) {
                listHTML += '\
                <a href="./detail.html">\
                    <div class="separator-line"></div>\
                    <div class="item">\
                        <div class="index">'+(i+1)+'</div>\
                        <div class="preview" style="background-image: url(./../static/image/video-thumbnails/0.jpg);">\
                            <img src="./../static/image/scale/16-9.png" alt="">\
                        </div>\
                        <div class="info">\
                            <div class="title">All Cutscenes (Game Movie)</div>\
                            <div class="time">2016年6月</div>\
                        </div>\
                        <div class="duration">23:99</div>\
                    </div>\
                </a>\
                ';
            }
            
            listHTML = '<div class="album-video-list">' + listHTML + '</div>';
            
            container.find('.separator-line').before(listHTML);
        });
        
    };
    bindEvents();
});