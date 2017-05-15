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
    
    var loadingNewData = false, // 是否正在加载新数据中
        userLoadNewDataCount = 0, // 用户手动点击加载新数据的次数
        autoLoadNewDataCount = 0;
    
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
    
            if (loadingNewData || userLoadNewDataCount >= 2 ) { return; }
            
            userLoadNewDataCount++;
            loadingNewData = true;
            // todo: 此处获取更多数据加载到页面中
            // 模拟加载远程数据
            var newData = Array.apply(null, Array(5)).map(function(item, i) {
                return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
            });
            Vue.set(window.renderContext, 'watchHistory', window.renderContext.watchHistory.concat( newData ));
            loadingNewData = false;
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
    
        // 滚动到底部自动加载内容
        window.onscroll = function () {
            if (loadingNewData || userLoadNewDataCount < 2 ) { return; }
            
            if (autoLoadNewDataCount >= 5) {
                $('.load-more a').text('没有更多啦');
                return;
            }
            
            var bodyElement = $('body'),
                windowElement = $(window);
            // + bodyElement.offset().top + 50
            if (bodyElement.height() - bodyElement.scrollTop()  < windowElement.height()) {
                // 已经滚动到底部，自动加载新数据
                console.log('滚动到底部啦！');
                loadingNewData = true;
                
                $('.load-more a').text('加载中...');
                
                // 模拟加载远程数据
                setTimeout(function () {
                    $('.load-more a').text('加载更多');
                    
                    var newData = Array.apply(null, Array(5)).map(function(item, i) {
                        return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
                    });
                    Vue.set(window.renderContext, 'watchHistory', window.renderContext.watchHistory.concat( newData ));
                    // 设定新的链接 ...
                    
                    
                    loadingNewData = false;
                    autoLoadNewDataCount++;
                }, 1000);
            }
        }
        
    };
    bindEvents();
    
});