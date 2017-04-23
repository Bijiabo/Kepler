/**
 * Created by huchunbo on 2017/4/6.
 */
window.didLoadActions = [];

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            watchHistory: Array.apply(null, Array(5)).map(function(item, i) {
                return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
            }),
            searchString: false,
            searchResultCount: 0
        },
        methods: {
        },
        mounted: function () {
            window.renderContext = this;
            window.originalWatchHostiry = this.watchHistory;
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
            // 模拟加载远程数据
            var newData = Array.apply(null, Array(5)).map(function(item, i) {
                return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
            });
            Vue.set(window.renderContext, 'watchHistory', window.renderContext.watchHistory.concat( newData ));
        });
        
        // 用户搜索信息
        var doSearchHistory = function () {
            var searchString = $('.search-history-input').val();
            if (searchString == undefined || searchString.length == 0) {
                Vue.set(window.renderContext, 'watchHistory', window.originalWatchHostiry);
                Vue.set(window.renderContext, 'searchString', false);
                return;
            }
            
            Vue.set(window.renderContext, 'searchString', searchString);
            var searchResult = window.originalWatchHostiry.filter(function (item) {
                var format = new RegExp(searchString, 'ig');
                return format.test(item);
            });
            Vue.set(window.renderContext, 'watchHistory', searchResult);
            Vue.set(window.renderContext, 'searchResultCount', searchResult.length);
        };
        $(document).on('click', '.search-history-button', function () {
            doSearchHistory();
        });
        $(document).on('keypress', '.search-history-input', function (e) {
            if(e.which == 13) {
                doSearchHistory();
            }
        });
        
    };
    bindEvents();
    
});