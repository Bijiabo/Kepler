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
        // 用户删除观看记录条目
        $(document).on('click', '.list-video-card .delete', function () {
            var $this = $(this);
            var targetId = $this.attr('target-id');
            // todo: 调用接口删除观看记录条目
            $this.parent('.list-video-card-item-package').remove();
            console.log($this.parent('.list-video-card-item-package'));
        });
        
        // 用户点击加载更多
        $(document).on('click', '.load-more', function (e) {
            e.preventDefault();
            // todo: 此处获取更多数据加载到页面中
        });
    };
    bindEvents();
    
});