/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            watchHistory: Array.apply(null, Array(10)).map(function(item, i) {
                return 0;
            })
        },
        methods: {
        },
        mounted: function () {
            window.renderContext = this;
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
        // 用户删除搜索记录条目
        $(document).on('click', '.list-video-card .delete', function () {
            var $this = $(this);
            var targetId = $this.attr('target-id');
            // todo: 调用接口删除搜索记录条目
            $this.parents('.list-video-card-item-package').remove();
        });
        
        // 用户点击加载更多
        $(document).on('click', '.load-more', function (e) {
            e.preventDefault();
            // todo: 此处获取更多数据加载到页面中
            // 模拟加载远程数据
            var newData = Array.apply(null, Array(10)).map(function(item, i) {
                return 0;
            });
            Vue.set(window.renderContext, 'watchHistory', window.renderContext.watchHistory.concat( newData ));
        });
    };
    bindEvents();
    
});