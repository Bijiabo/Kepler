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
    
    var generateHTML = function (targetItemData) {
        var template = $('.list-video-card-item-template');
        
        template.find('.en_name').text(targetItemData.enName || 'fake en title');
        template.find('.zh_name').text(targetItemData.zhName  || 'fake cn title');
        template.find('.author').text(targetItemData.author);
        template.find('.watch-count').text(targetItemData.watchCount);
        template.find('.delete').text(targetItemData.delete || '9999');
        
        return template.html();
    };
    
    var displayNewItemsForData = function (newData) {
        var targetHTML = '';
        for (var i=0,len=newData.length; i<len; i++) {
            targetHTML += generateHTML(newData[i]);
        }
        
        $('.list-container').append(targetHTML);
    };
    
    var bindEvents = function () {
        // 用户删除观看记录条目
        $(document).on('click', '.list-video-card .menu', function () {
            var $this = $(this).parents('.list-video-card');
            var targetId = $this.attr('target-id');
            
            if ($this.find('.menu-content').length > 0) {
                $this.find('.menu-content').remove();
            } else {
                $('.menu-content').remove();
                $('.list-video-card .menu-content').remove();
                
                var menuContentHTML = '\
                <div class="menu-content">\
                    <div class="item title menu-add-to-album">\
                    <i class="icon fa fa-list-ul" aria-hidden="true"></i>\
                    添加到\
                    </div>\
                    <div class="item menu-remove">删除</div>\
                    \
                </div>';
                $this.append(menuContentHTML);
            }
            
        });
        
        // 用户点击"添加到"按钮
        $(document).on('click', '.menu-add-to-album', function () {
            var $this = $(this);
            var menuContentContainer = $this.parents('.menu-content');
            if (menuContentContainer.find('.album-item').length > 0) { return; }
            menuContentContainer.find('.menu-remove').remove();
            // todo: 获取用户的专辑列表
            var albumList = [
                {
                    title: '专辑名称一',
                    id: 1038,
                    hasThisOne: true
                },
                {
                    title: '专辑名称二',
                    id: 1039,
                    hasThisOne: false
                }
            ];
            var html = '';
            for (var i=0,len=albumList.length; i<len; i++) {
                var item = albumList[i];
                html += '<div class="item album-item '+(item.hasThisOne ? 'active' : '')+'" album-id="'+item.id+'">'+item.title+'</div>';
            }
            html += '<div class="item menu-new-album-input">\
                        <input type="text" class="new-album">\
                    </div>';
            $this.after(html);
            menuContentContainer.append('<div class="item button menu-create">创建</div>');
        });
        
        // 用户点击 menu 中的删除按钮
        $(document).on('click', '.list-video-card .menu-remove', function () {
            var $this = $(this);
            // todo: 调用接口删除此条目
            $this.parents('.list-video-card-item-package').remove();
        });
        
        // 用户点击加入某个专辑
        $(document).on('click', '.menu-content .album-item', function () {
            var $this = $(this);
            if ($this.hasClass('active')) {
                // todo: 调用接口从用户播放专辑删除
                $this.removeClass('active');
            } else {
                // todo: 调用接口添加到用户播放专辑
                $this.addClass('active');
            }
            
        });
        
        // 用户点击加载更多
        $(document).on('click', '.load-more', function (e) {
            e.preventDefault();
    
            if (loadingNewData) { return; }
    
            if (userLoadNewDataCount >= 5) {
                $('.load-more a').text('没有更多啦');
                return;
            }
            
            userLoadNewDataCount++;
            loadingNewData = true;
            // todo: 此处获取更多数据加载到页面中
            // 模拟加载远程数据
            var newData = Array.apply(null, Array(10)).map(function(item, i) {
                return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
            });
            
            displayNewItemsForData(newData);
            
            
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
                    
                    var newData = Array.apply(null, Array(10)).map(function(item, i) {
                        return 'Horizon Zero Dawn All Cutscenes (Game Movie) PS4 PRO 1080p';
                    });
                    
                    displayNewItemsForData(newData);
                    // 设定新的链接 ...
                    
                    
                    loadingNewData = false;
                    autoLoadNewDataCount++;
                }, 1000);
            }
        };
        
        // 用户键入分类信息后敲击回车
        $(document).on('click', '.menu-content .menu-create', function (e) {
            // if (e.which !== 13) { return; }
            var content = $('.new-album').val();
            if (content.length === 0) { return; }
            // todo: 请求创建新专辑接口
            // 添加新专辑项目
            $(this).parents('.menu-content').find('.menu-new-album-input').before('<div class="item">'+content+'</div>');
            $('.new-album').val('');
        });
        
        // 用户点击收藏专辑 item 切换专辑视频列表显示
        $(document).on('click', '.album-collect-list .list-video-card', function () {
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
                \
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
                        <div class="right-button-group">\
                            <div class="menu" target-id="'+(i+1)+'">\
                                <i class="fa fa-list-ul" aria-hidden="true"></i>\
                            </div>\
                            <div class="remove" target-id="'+(i+1)+'">\
                                <i class="iconfont">&#xe605;</i>\
                            </div>\
                        </div>\
                    </div>\
                \
                ';
            }
        
            listHTML = '<div class="album-video-list">' + listHTML + '</div>';
        
            container.find('.separator-line').before(listHTML);
        });
        
        // 用户点击收藏专辑 播放列表 子条目的删除按钮
        $(document).on('click', '.album-collect-list .right-button-group .remove', function () {
            // todo: 调用接口删除此条目
            // 获取新的列表数据，直接重新渲染此列表
            var $this = $(this);
            var container = $this.parents('.list-video-card-item-package');
            container.find('.album-video-list').remove();
    
            var playlistLength = 5;
    
            var listHTML = '';
            for (var i=0; i<playlistLength; i++) {
                listHTML += '\
                \
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
                        <div class="right-button-group">\
                            <div class="menu" target-id="'+(i+1)+'">\
                                <i class="fa fa-list-ul" aria-hidden="true"></i>\
                            </div>\
                            <div class="remove" target-id="'+(i+1)+'">\
                                <i class="iconfont">&#xe605;</i>\
                            </div>\
                        </div>\
                    </div>\
                \
                ';
            }
    
            listHTML = '<div class="album-video-list">' + listHTML + '</div>';
    
            container.find('.separator-line').before(listHTML);
        });
        
        // 用户点击收藏专辑页面 播放列表 子条目的菜单按钮
        $(document).on('click', '.album-collect-list .right-button-group .menu', function () {
            var $this = $(this).parents('.right-button-group');
            var targetId = $this.attr('target-id');
        
            if ($this.find('.menu-content').length > 0) {
                $this.find('.menu-content').remove();
            } else {
                $('.menu-content').remove();
                $('.list-video-card .menu-content').remove();
            
                var menuContentHTML = '\
                <div class="menu-content">\
                    <div class="item title menu-add-to-album">\
                    <i class="icon fa fa-list-ul" aria-hidden="true"></i>\
                    添加到\
                    </div>\
                    <div class="item menu-remove">删除</div>\
                    \
                </div>';
                $this.append(menuContentHTML);
                
                $this.find('.menu-add-to-album').click();
            }
        });
    
        // 用户点击 menu 中的删除按钮
        $(document).on('click', '.album-collect-list .menu-remove', function () {
            var $this = $(this);
            // todo: 调用接口删除此条目
            $this.parents('.item').remove();
        });
        
    };
    bindEvents();
    
});